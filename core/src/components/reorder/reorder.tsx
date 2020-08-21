import { Component, ComponentInterface, Host, Listen, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';

/**
 * @part icon - The icon of the reorder handle (uses ion-icon).
 */
@Component({
  tag: 'ion-reorder',
  styleUrls: {
    ios: 'reorder.ios.scss',
    md: 'reorder.md.scss',
  },
  shadow: true
})
export class Reorder implements ComponentInterface {

  @Listen('click', { capture: true })
  onClick(ev: Event) {
    const currentTarget = ev.currentTarget as HTMLElement;
    const reorderGroupEl = currentTarget.closest('ion-reorder-group');
    ev.preventDefault();

    // do not stop event propagation if reorder is inside disabled ion-reorder-group
    // it allows interaction with included components
    if (!reorderGroupEl || !reorderGroupEl.disabled) {
      ev.stopImmediatePropagation();
    }
  }

  render() {
    const mode = getIonMode(this);
    const reorderIcon = mode === 'ios' ? 'reorder-three-outline' : 'reorder-two-sharp';
    return (
      <Host class={mode}>
        <slot>
          <ion-icon name={reorderIcon} lazy={false} class="reorder-icon" part="icon" />
        </slot>
      </Host>
    );
  }

}
