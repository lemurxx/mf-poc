import { Component, Prop, h } from "@stencil/core";
import { popoverController } from '@ionic/core';


@Component({
    tag: 'poc-popover',
    shadow: true,
    styleUrl: 'popover.css',
})
export class PocPopover {

    @Prop()
    content: string;

    close() {
        popoverController.dismiss();
    }

    render() {
        return (
            <div>
                <div class="content-wrap" innerHTML={this.content}>
                </div>
                <div class="buttons">
                    <poc-button onClick={this.close}>OK</poc-button>
                </div>
            </div>
        )
    }

}  