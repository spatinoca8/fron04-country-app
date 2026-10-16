import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.component.html',
  styles: ``
})
export class CountrySearchComponent {
   placeholder = input<string>('Buscar');
   value=output<string>()
   initialValue=input<string>('');
   inputValue= linkedSignal<string>(()=>this.initialValue());

   debounceEffect = effect((onCleanup)=>{
    const value=this.inputValue();
    const timeout = setTimeout(()=>{
      this.value.emit(value);
    },1000);

    onCleanup(()=>{
      clearTimeout(timeout);
    })
   })

}
