import { Component, h, Host, Event, Prop, State, EventEmitter, Watch } from "@stencil/core";

@Component({
    tag: 'poc-switch',
    shadow: true,
    styleUrl: 'switch.css',
})
export class PocSwitch {

    @State()
    selectedSide: 'left' | 'right';

    @Prop()
    leftValue: { label: string, value: any };

    @Prop()
    rightValue: { label: string, value: any };


    @Prop({ mutable: true, reflect: true })
    value: any;

    @Watch('value')
    setSelection(newValue: any, oldValue: any) {
        if (oldValue !== newValue) {
            if (this.value === this.leftValue.value) {
                this.selectedSide = 'left';
            }
            else if (this.value === this.rightValue.value) {
                this.selectedSide = 'right';
            }
        }
    }

    componentWillLoad() {
        this.setSelection(this.value, null);
    }

    @Event()
    toggled: EventEmitter<{ label: string, value: any }>;


    toggleSide(side: 'left' | 'right') {
        this.selectedSide = side;
        this.toggled.emit(side === 'left' ? this.leftValue : this.rightValue);
    }

    render() {

        return (
            <Host>
                <div class="switch-root">
                    <div class={{ selected: this.selectedSide === 'left' }} onClick={() => this.toggleSide('left')}>{this.leftValue.label}</div>
                    <div class={{ selected: this.selectedSide === 'right' }} onClick={() => this.toggleSide('right')}>{this.rightValue.label}</div>
                </div>
            </Host>
        )
    }
}
