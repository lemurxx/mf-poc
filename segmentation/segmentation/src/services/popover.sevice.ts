import { popoverController } from '@ionic/core';

export async function presentPopover(popoverContent, popoverAttrs, customClass) {

    const popover = await popoverController.create({
        component: popoverContent,
        cssClass: customClass,
        componentProps: popoverAttrs,
        //event: ev,
        translucent: true,
    });
    await popover.present();
}

