import { Component, Prop, h } from "@stencil/core";



@Component({
    tag: 'poc-badge',
    shadow: true,
    styleUrl: 'badge.css',
})
export class PocBadge {

    @Prop()
    color: string;

    @Prop()
    type: 'error' | 'success'

    getColor() {
        if (this.type) {

        }
    }

    render() {
        return (
            <ion-chip class={this.type} style={this.color && { '--background': this.color }}>
                <span>
                    <slot></slot>
                </span>
            </ion-chip>
        )
    }

}  