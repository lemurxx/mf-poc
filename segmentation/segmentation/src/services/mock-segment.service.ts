import { ALL, DEMOTING, PROMOTING, SegmentationTabType, STABLE } from "./segment.constants";
const mockData = {
    achvdSlsAmt: null,
    achvdSgmtLvlTxt: 'Bronze Star',
    nxtLvlSlsAmt: '250.0',
    qlfdSlsAmt: '0.0',
    qlfdSgmtLvlTxt: 'Bronze Star',
    newSgmtLvlDt: null,
    currCyclTxt: 'Apr-Jun',
    prevCyclTxt: 'Jan-Mar',
    totalNumberOfUsers: 600,
    sgmtLvls: [
        {
            sgmtLvlTxt: 'Inactive',
            maxSlsAmt: 0.0,
            sgmtLvlCd: '0',
            projected: {
                qualified: 7,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            }
        },
        {
            sgmtLvlTxt: 'Bronze Star',
            maxSlsAmt: 249.99,
            sgmtLvlCd: '1',
            projected: {
                qualified: 11,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 2,
                achieved: 1,
                projected: 3,
                promotion: 2,
                demotion: 0,
                stable: 1,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 4,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            }
        },
        {
            sgmtLvlTxt: 'Silver Star',
            maxSlsAmt: 549.99,
            sgmtLvlCd: '2',
            projected: {
                qualified: 7,
                achieved: 2,
                projected: 7,
                promotion: 5,
                demotion: 3,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 5,
                achieved: 8,
                projected: 7,
                promotion: 1,
                demotion: 6,
                stable: 1,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 3,
                projected: 7,
                promotion: 11,
                demotion: 9,
                stable: 2,
                firstTimePromotion: 1
            }
        },
        {
            sgmtLvlTxt: 'Gold Star',
            maxSlsAmt: 1299.99,
            sgmtLvlCd: '3',
            projected: {
                qualified: 2,
                achieved: 6,
                projected: 4,
                promotion: 5,
                demotion: 9,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 3,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 3,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 7,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            }
        },
        {
            sgmtLvlTxt: 'Platinum Star',
            maxSlsAmt: 3499.99,
            sgmtLvlCd: '4',
            projected: {
                qualified: 7,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            }
        },
        {
            sgmtLvlTxt: 'VIP Star',
            maxSlsAmt: 99999999,
            sgmtLvlCd: '5',
            projected: {
                qualified: 7,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 10,
                firstTimePromotion: 1
            },
            current: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            },
            closed: {
                qualified: 5,
                achieved: 6,
                projected: 7,
                promotion: 8,
                demotion: 9,
                stable: 1,
                firstTimePromotion: 1
            }
        }
    ]
};

export class MockSegmentService {

    sectionKeys = [DEMOTING, PROMOTING, STABLE];

    selectedQuarter = SegmentationTabType.CURRENT;
    downlineLength = 0;

    levelDataCurrent;
    levelDataClosed;
    sectionDataCurrent;
    sectionDataClosed;
    segmentLevels;

    constructor() {

        this.sectionDataCurrent = {
            demoting: {}, promoting: {}, stable: {}, promotingFirst: {}
        }

        this.sectionDataClosed = {
            demoting: {}, promoting: {}, stable: {}, promotingFirst: {}
        }

        this.levelDataCurrent = { qualified: {}, achieved: {}, predicted: {} }

        this.levelDataClosed = { qualified: {}, achieved: {}, predicted: {} }

        this.segmentLevels = [];

        mockData.sgmtLvls.forEach(lvl => {
            this.sectionDataCurrent.demoting[lvl.sgmtLvlCd] = lvl.current.demotion;
            this.sectionDataCurrent.promoting[lvl.sgmtLvlCd] = lvl.current.promotion;
            this.sectionDataCurrent.stable[lvl.sgmtLvlCd] = lvl.current.stable;
            this.sectionDataCurrent.promotingFirst[lvl.sgmtLvlCd] = lvl.current.firstTimePromotion;

            this.sectionDataClosed.demoting[lvl.sgmtLvlCd] = lvl.closed.demotion;
            this.sectionDataClosed.promoting[lvl.sgmtLvlCd] = lvl.closed.promotion;
            this.sectionDataClosed.stable[lvl.sgmtLvlCd] = lvl.closed.stable;
            this.sectionDataClosed.promotingFirst[lvl.sgmtLvlCd] = lvl.closed.firstTimePromotion;

            this.levelDataCurrent.qualified[lvl.sgmtLvlCd] = lvl.current.qualified;
            this.levelDataCurrent.achieved[lvl.sgmtLvlCd] = lvl.current.achieved;
            this.levelDataCurrent.predicted[lvl.sgmtLvlCd] = lvl.current.projected;

            this.levelDataClosed.qualified[lvl.sgmtLvlCd] = lvl.closed.qualified;
            this.levelDataClosed.achieved[lvl.sgmtLvlCd] = lvl.closed.achieved;
            this.levelDataClosed.predicted[lvl.sgmtLvlCd] = lvl.closed.projected;
        })

        for (let prop in this.levelDataClosed) {
            this.levelDataClosed[prop][ALL] = Object.values(this.levelDataClosed[prop]).reduce((prev, acc) => +prev + +acc, 0);
        }

        for (let prop in this.levelDataCurrent) {
            this.levelDataCurrent[prop][ALL] = Object.values(this.levelDataCurrent[prop]).reduce((prev, acc) => +prev + +acc, 0);
        }

        for (let prop in this.sectionDataClosed) {
            this.sectionDataClosed[prop][ALL] = Object.values(this.sectionDataClosed[prop]).reduce((prev, acc) => +prev + +acc, 0);
        }

        for (let prop in this.sectionDataCurrent) {
            this.sectionDataCurrent[prop][ALL] = Object.values(this.sectionDataCurrent[prop]).reduce((prev, acc) => +prev + +acc, 0);
        }

        this.segmentLevels = mockData.sgmtLvls.map(lvl => ({ levelCode: lvl.sgmtLvlCd, levelText: lvl.sgmtLvlTxt }));
    }

    // @ts-ignore
    async getSegmentLevels(token) {
        return Promise.resolve(this.segmentLevels);
    }

    // @ts-ignore
    async initSectionsAndLevelsData(type, token) {
        const result = type === SegmentationTabType.CURRENT ? { levelData: this.levelDataCurrent, sectionData: this.sectionDataCurrent } :
            { levelData: this.levelDataClosed, sectionData: this.sectionDataClosed }
        return Promise.resolve(result);
    }

    // @ts-ignore
    async getDownlineLength(token) {
        return Promise.resolve(32);
    }

    // @ts-ignore
    async getCycleTexts(token) {
        return Promise.resolve({ prev: mockData.prevCyclTxt, curr: mockData.currCyclTxt, pred: 'Predicted' });
    }

}