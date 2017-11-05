import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://www.bananiumlabs.com/" target="_blank">BananiumTeam</a></b> 2017</span>
    <div class="socials">
      <a href="https://github.com/BananiumLabs" target="_blank" class="ion ion-social-github"></a>

    </div>
  `,
})
export class FooterComponent {
}
