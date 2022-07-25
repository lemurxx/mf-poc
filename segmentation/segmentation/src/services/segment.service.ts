import { dataService } from "./dataService";
import { ALL, CURRENT_QUARTER, DEMOTING, PROMOTING, SegmentationTabType, STABLE } from "./segment.constants";


export class SegmentService {

    sectionKeys = [DEMOTING, PROMOTING, STABLE];
    sectionData = {} as any;
    levelData = {} as any;
    segmentLevels = [];
    selectedQuarter = SegmentationTabType.CURRENT;
    downlineLength = 0;

    async getSegmentData() {
        const requests = [dataService.getDownlineSegments(), dataService.getSegments()];
        const results = await Promise.all(requests);
        return results;
    }


    async getSegmentLevels(repId: number) {

        if (this.segmentLevels && this.segmentLevels.length) {
            return Promise.resolve(this.segmentLevels);
        }
        const [downlineSegments, segments] = await this.getSegmentData();
        const repSegment = downlineSegments.find(ds => +ds.acctNr === repId);
        if (segments && repSegment) {
            this.segmentLevels = segments
                .filter(
                    segment =>
                        segment.cyclIdNr === repSegment.currCyclIdNr &&
                        segment.prgrmCd.trim() === repSegment.sgmtPrgrmCd?.trim()
                )
                .map(s => ({
                    levelCode: +s.lvlCd,
                    levelText: s.lvlTxt,
                    targetAmount: s.slsTrgtAmt
                }))
                .sort((a, b) => (a.levelCode > b.levelCode ? 1 : -1));
        }
        return this.segmentLevels;
    }


    isDemoting(qualifiedCd: string, achievedCd: string): boolean {
        return qualifiedCd > achievedCd;
    }

    isPromoting(qualifiedCd: string, achievedCd: string): boolean {
        return (
            (qualifiedCd < achievedCd || !qualifiedCd || qualifiedCd === '0') &&
            !!achievedCd &&
            achievedCd !== '0'
        );
    }

    isStable(qualifiedCd: string, achievedCd: string): boolean {
        return qualifiedCd === achievedCd && !!achievedCd && achievedCd !== '0';
    }

    noData(qualifiedCd: string, achievedCd: string): boolean {
        return qualifiedCd === achievedCd && !achievedCd;
    }

    async initSectionsAndLevelsData(repId: number, compareToPrediction: boolean) {
        const segmentLevels = await this.getSegmentLevels(repId);
        [...this.sectionKeys, 'promotingFirst'].forEach(key => {
            this.sectionData[key] = {};
            segmentLevels.forEach(option => {
                this.sectionData[key][option.levelCode] = 0;
            });
        });
        // init overviewLevels model
        ['qualified', 'achieved', 'predicted'].forEach(key => {
            this.levelData[key] = {};
            segmentLevels.forEach(option => {
                this.levelData[key][option.levelCode] = 0;
            });
        });

        const downline = await dataService.getDownline();
        const downlineSegments = await dataService.getDownlineSegments();
        downline.forEach(rep => {
            if (!rep.core.inStaffInd) {
                return;
            }
            const repSegment = downlineSegments.find(ds => +ds.acctNr === rep.acctNr);
            const achvdSgmtLvlCd =
                this.selectedQuarter === CURRENT_QUARTER
                    ? repSegment?.achvdSgmtLvlCd?.trim()
                    : repSegment?.qlfdSgmtLvlCd?.trim();
            const qlfdSgmtLvlCd =
                this.selectedQuarter === CURRENT_QUARTER
                    ? repSegment?.qlfdSgmtLvlCd?.trim()
                    : repSegment?.prvQlfdSgmtLvlCd?.trim();
            const ftAchvdSgmtLvlCd =
                this.selectedQuarter === CURRENT_QUARTER
                    ? repSegment?.ftCurrAchvdSgmtLvlCd
                    : repSegment?.ftAchvdSgmtLvlCd;
            const prjctdSgmtLvlCd = rep.segment?.prjctdSgmtLvlCd?.trim();
            const achievedOrPojectedCd =
                this.selectedQuarter === CURRENT_QUARTER
                    ? compareToPrediction
                        ? prjctdSgmtLvlCd
                        : achvdSgmtLvlCd
                    : achvdSgmtLvlCd;

            if (prjctdSgmtLvlCd) {
                this.levelData.predicted[prjctdSgmtLvlCd]++;
            }
            if (qlfdSgmtLvlCd) {
                this.levelData.qualified[qlfdSgmtLvlCd]++;
            }
            if (achvdSgmtLvlCd) {
                this.levelData.achieved[achvdSgmtLvlCd]++;
            }

            if (
                this.isDemoting(qlfdSgmtLvlCd, achievedOrPojectedCd)
            ) {
                this.sectionData.demoting[achievedOrPojectedCd]++;
                this.sectionData.demoting[ALL]++;
            } else if (
                this.isPromoting(
                    qlfdSgmtLvlCd,
                    achievedOrPojectedCd
                )
            ) {
                this.sectionData.promoting[achievedOrPojectedCd]++;
                this.sectionData.promoting[ALL]++;
                // the "ftAchvdSgmtLvlCd" is set via the performance dataRef kpiMapping
                if (ftAchvdSgmtLvlCd > '1') {
                    this.sectionData.promotingFirst[achievedOrPojectedCd]++;
                    this.sectionData.promotingFirst[ALL]++;
                }
            } else if (
                this.isStable(qlfdSgmtLvlCd, achievedOrPojectedCd)
            ) {
                this.sectionData.stable[achievedOrPojectedCd]++;
                this.sectionData.stable[ALL]++;
            }
        });
        console.log(JSON.stringify(this.sectionData), JSON.stringify(this.levelData));
        return { sectionData: this.sectionData, levelData: this.levelData };

    }
}


    //   getPerformanceStatus(
    //     qualifiedCd: string,
    //     achievedCd: string
    //   ): PerformanceStatus {
    //     if (this.isPromoting(qualifiedCd, achievedCd)) {
    //       return PerformanceStatus.PROMOTED;
    //     }
    //     if (this.isDemoting(qualifiedCd, achievedCd)) {
    //       return PerformanceStatus.DEMOTED;
    //     }
    //     if (this.isStable(qualifiedCd, achievedCd)) {
    //       return PerformanceStatus.STABLE;
    //     }
    //     return PerformanceStatus.NO_DATA;
    //   }

    //async getSegmentLevels(repId: number) {
        // if (this.initConfig.isAgpService) {
        //     const thresholds = rep.segment?.thresholds || [];
        //     return thresholds.map((t, i) => ({
        //         levelCode: t.level,
        //         levelText: t.levelTxt,
        //         targetAmount: thresholds[i + 1]?.thresholdAmt
        //     }));
        // } else {
