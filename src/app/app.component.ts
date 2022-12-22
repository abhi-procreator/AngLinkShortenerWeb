import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngTinyUrl';

  model = {
    inputUrl: '',  
  }

  isFormSubmmited = false;
  isTextCopied = false;
  shortUrl = '';


  constructor(private tinyUrlService: NgTinyUrlService) { }
  
  ngOnInit(): void {
  }


  onSubmitUrlForm(urlForm: any) {

    if (urlForm) {
      this.isFormSubmmited = true;

      this.tinyUrlService.shorten(this.model.inputUrl).subscribe((data: any) => {
        this.shortUrl = data;
      },
        (error) => {
          console.log('error :: ', error);
          alert("Something went wrong. Please check your url and try again !");
        }
      );
    }
  }


  reset() {
    this.model.inputUrl = '';
    this.isFormSubmmited = false;
    this.isTextCopied = false;
  }

  copyUrl(shortUrlElementRef: any) {
    let inputElement = document.createElement('input');
    // console.log(inputElement);
    
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', shortUrlElementRef.innerHTML);

    inputElement.select();
    inputElement.setSelectionRange(0, 999999);
    try {
      navigator.clipboard.writeText(inputElement.value);
      this.isTextCopied = true;

      setTimeout(() => {
        this.isTextCopied = false;
      }
        , 2000)
    } catch (e: any) {
      console.log('error while copying..', e.toString());

    } 

  }
}