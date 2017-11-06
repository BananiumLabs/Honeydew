import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://www.bananiumlabs.com/" target="_blank">BananiumTeam</a></b> 2017</span>
    <span class="created-by">Made For <b><a href="https://firebird-hacks-5741.devpost.com/" target="_blank">Firebird Hacks I</a></b></span>
    <div class="socials">
      <a href="https://github.com/BananiumLabs" target="_blank" class="ion ion-social-github"></a>

    </div>
  `,
})
export class FooterComponent {
}
