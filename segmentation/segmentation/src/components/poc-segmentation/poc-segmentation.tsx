import { Component, Host, h, State, Prop, Watch } from '@stencil/core';
import '@ionic/core';
import { presentPopover } from '../../services/popover.sevice';
/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';
import 'ionicons';
import { whatsThisDemotingText } from './segmentation-messages';
import { ALL, ALLLEVELS, CLOSED_QUARTER, CURRENT_QUARTER } from '../../services/segment.constants';
import { MockSegmentService } from '../../services/mock-segment.service';



@Component({
  tag: 'poc-segmentation',
  shadow: true,
  styleUrl: 'segmentation.css'
})
export class PocSegmentation {

  @Prop()
  auth: string;

  authData: {
    userId: number,
    xSecToken: string
  };

  segmentService: MockSegmentService = new MockSegmentService();
  @State()
  segmentLevels: { levelCode: number, levelText: string }[] = [];

  @State()
  sectionData;

  @State()
  levelData;

  @State()
  selectedLevel = ALL;

  @State()
  downlineLength;

  @State()
  legendTexts;


  @Watch('auth')
  async init(authData) {
    this.authData = JSON.parse(authData);
    this.segmentLevels = await this.segmentService.getSegmentLevels(this.authData.xSecToken);
    this.segmentLevels.unshift({
      levelText: ALLLEVELS,
      levelCode: ALL
    });
    this.initSectionsAndLevels(CURRENT_QUARTER);
    this.downlineLength = await this.segmentService.getDownlineLength(this.authData.xSecToken);
    this.legendTexts = await this.segmentService.getCycleTexts(this.authData.xSecToken);
  }

  async initSectionsAndLevels(type) {
    const { sectionData, levelData } = await this.segmentService.initSectionsAndLevelsData(type, this.authData.xSecToken);
    this.sectionData = { ...sectionData };
    this.levelData = { ...levelData };
  }

  componentDidLoad() {
    if (this.auth) {
      this.init(this.auth);
    }
  }

  async onQuarterChange(evt) {
    this.initSectionsAndLevels(evt.detail.value);
  }

  onLevelChange(event) {
    this.selectedLevel = event.detail.value;
  }

  showPopover(text) {
    presentPopover('poc-popover', { content: text }, 'simple-popover');
  }

  getChartBarLengthPercentage(value: number): number {
    return this.downlineLength ? (value / this.downlineLength * 100) : 0;
  }

  alertOptions = {
    title: null,
    cssClass: 'simple-select',
    buttons: {
      cssClass: 'no-btn'
    }
  }

  render() {
    return (
      <Host>
        <div class="segmentation-root">
          <div class="title">
            <h2>My Team Rewards</h2>
            <poc-tooltip>Help</poc-tooltip>
          </div>

          <poc-switch
            leftValue={{ label: 'Closed Quarter', value: CLOSED_QUARTER }}
            rightValue={{ label: 'Current Quarter', value: CURRENT_QUARTER }}
            value={CURRENT_QUARTER}
            onToggled={evt => this.onQuarterChange(evt)}
          ></poc-switch>


          <ion-item class="select-parent">
            <ion-select
              interface="popover"
              interfaceOptions={{ side: 'left', alignment: 'start' }}
              value={this.selectedLevel}
              onIonChange={evt => this.onLevelChange(evt)}>
              {
                this.segmentLevels.map(
                  lvl => <ion-select-option value={lvl.levelCode}>{lvl.levelText}</ion-select-option>)
              }
            </ion-select>
          </ion-item>

          <ion-accordion-group multiple={true} class="sections-accordion">
            <ion-accordion>
              <ion-item slot="header">
                <div class="accordion-header">
                  <div class="badge-container">
                    <poc-badge type="error" color="hotpink">
                      Support
                    </poc-badge>
                  </div>
                  <div class="title">Demoting</div>
                  {this.sectionData?.demoting ?
                    <div class="sectionValue error">{this.sectionData['demoting'][this.selectedLevel]}</div> : ''
                  }
                </div>
              </ion-item>
              <div slot="content">
                <ion-chip outline color="primary" onClick={() => this.showPopover(whatsThisDemotingText)}>
                  <ion-label>What's this?</ion-label>
                </ion-chip>
                <ion-chip outline color="primary" onClick={() => this.showPopover('Demoting chip 1')}>
                  <ion-label>Next Steps</ion-label>
                </ion-chip>
                <ion-chip outline color="primary">
                  <ion-label>View</ion-label>
                </ion-chip>
              </div>
            </ion-accordion>
            <ion-accordion>
              <ion-item slot="header">
                <div class="accordion-header">
                  <div class="badge-container">
                    <poc-badge type="success">
                      Encourage
                    </poc-badge>
                  </div>
                  <div class="title">Promoting</div>
                  {this.sectionData?.promoting ?
                    <div class="sectionValue success">{this.sectionData['promoting'][this.selectedLevel]}</div> : ''
                  }
                </div>
              </ion-item>
              <div slot="content">
                <ion-chip outline color="primary" onClick={() => this.showPopover('promoting what\' this')}>
                  <ion-label>What's this?</ion-label>
                </ion-chip>
                <ion-chip outline color="primary" onClick={() => this.showPopover('Promoting next steps')}>
                  <ion-label>Next Steps</ion-label>
                </ion-chip>
                <ion-chip outline color="primary">
                  <ion-label>View</ion-label>
                </ion-chip>
              </div>
            </ion-accordion>
            <ion-accordion>
              <ion-item slot="header">
                <div class="accordion-header">
                  <div class="title">Stable</div>
                  {this.sectionData?.stable ?
                    <div class="sectionValue">{this.sectionData['stable'][this.selectedLevel]}</div> : ''
                  }
                </div>
              </ion-item>
              <div slot="content">
                <ion-chip outline color="primary" onClick={() => this.showPopover('Stable what\'s this')}>
                  <ion-label>What's this?</ion-label>
                </ion-chip>
                <ion-chip outline color="primary" onClick={() => this.showPopover('Stable next steps')}>
                  <ion-label>Next Steps</ion-label>
                </ion-chip>
                <ion-chip outline color="primary">
                  <ion-label>View</ion-label>
                </ion-chip>
              </div>
            </ion-accordion>
          </ion-accordion-group>


          <ion-accordion-group class="charts-accordion">
            <ion-accordion>
              <ion-item slot="header">
                <div>
                  { /* <ion-icon name="chevron-down"></ion-icon> */ }
                  <svg viewBox="0 0 512 512">
                    <path class="chevron" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"></path>
                  </svg> 
                  <span>Overview</span>
                </div>
              </ion-item>
              <div slot="content">
                <div class="legend">
                  {
                    this.legendTexts &&
                    Object.entries(this.legendTexts).map(([key, value]) => <div class="cycle"><div class={key}></div><div>{value}</div></div>)
                  }
                </div>
                {
                  this.downlineLength && this.levelData && Object.entries(this.levelData) &&
                  this.segmentLevels.slice(1).map(lvl => {
                    return (ALL === this.selectedLevel || lvl.levelCode === this.selectedLevel) &&
                      (<div class="lvl">
                        <div class="lvl-header">
                          {lvl.levelText}
                        </div>
                        <div class="lvl-chart">
                          <poc-barchart
                            value1={this.levelData['qualified'][lvl.levelCode]}
                            value2={this.levelData['achieved'][lvl.levelCode]}
                            value3={this.levelData['predicted'][lvl.levelCode]}
                            perc1={this.getChartBarLengthPercentage(this.levelData['qualified'][lvl.levelCode])}
                            perc2={this.getChartBarLengthPercentage(this.levelData['achieved'][lvl.levelCode])}
                            perc3={this.getChartBarLengthPercentage(this.levelData['predicted'][lvl.levelCode])}
                          ></poc-barchart>
                        </div>
                      </div>)
                  })
                }
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </div>
      </Host >
    );
  }

}

