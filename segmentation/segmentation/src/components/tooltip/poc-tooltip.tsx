import { Component, h, Host } from "@stencil/core";


@Component({
    tag: 'poc-tooltip',
    shadow: true,
    styleUrl: 'tooltip.css',
})
export class PocToolTip {

    render() {

        return (
            <Host>
                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'>
                    <path fill='%237f28c4' fill-rule='evenodd' d='M7 0c3.857 0 7 3.143 7 7a6.958 6.958 0 0 1-2.054 4.946A6.958 6.958 0 0 1 7 14c-3.857 0-7-3.143-7-7 0-1.866.732-3.625 2.054-4.946A6.942 6.942 0 0 1 7 0zm3.854 10.854A5.419 5.419 0 0 0 12.444 7 5.444 5.444 0 0 0 7 1.556a5.419 5.419 0 0 0-3.854 1.59A5.419 5.419 0 0 0 1.556 7 5.444 5.444 0 0 0 7 12.444c1.46 0 2.826-.561 3.854-1.59zm-4.632-.062V9.333h1.459v1.459H6.222zM7 3.112c1.34 0 2.333.907 2.333 2.116 0 1.57-1.75 1.938-1.75 3.025v.303H6.125v-.492c0-1.588 1.632-1.871 1.74-2.77.065-.595-.282-.973-.865-.973s-.875.605-.875 1.21H4.667c0-1.512 1.011-2.42 2.333-2.42z' />
                </svg>
                <span class="tooltip">
                    <slot></slot>
                </span>
            </Host>
        )
    }
}
