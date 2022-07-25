
import { Component, Prop, h } from "@stencil/core";



@Component({
    tag: 'poc-barchart',
    shadow: true,
    styleUrl: 'barchart.css',
})
export class PocBarChart {

    @Prop()
    value1: number;

    @Prop()
    value2: number;

    @Prop()
    value3: number;

    @Prop()
    perc1: number;

    @Prop()
    perc2: number;

    @Prop()
    perc3: number;

    render() {
        return (
            <div class="root">
                <div class="background">
                    <svg viewBox="0,0,100,45" width="100" height="45" preserveAspectRatio="none">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num =>
                                <line x1={num * 10} y1="0" x2={num * 10} y2="100%" class="chart-line" />)
                        }
                    </svg>
                    <div class="bars">
                        <div class="bar bar-1" style={{ width: `${this.perc1}%` }}><span class={{ empty: this.perc1 < 5 }}>{this.value1}</span></div>
                        <div class="bar bar-2" style={{ width: `${this.perc2}%` }}><span class={{ empty: this.perc2 < 5 }}>{this.value2}</span></div>
                        <div class="bar bar-3" style={{ width: `${this.perc3}%` }}><span class={{ empty: this.perc3 < 5 }}>{this.value3}</span></div>
                    </div>
                </div>
            </div>
        )
    }

}

