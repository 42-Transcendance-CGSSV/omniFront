import {AComponent} from "../core/Classes/AComponent";
import BorderedButton from "./BorderedButton";

export class NavBar extends AComponent {

    public render(): NavBar {
        this.element = document.createElement("header");
        this.applyBasicProperties();
        this.element.innerHTML = `
        <nav class="py-3 px-10">

<div id="navbar-container" class="min-h-14 min-w-fit max-w-full flex flex-col md:flex-row items-center justify-between">

<div class="max-w-full flex items-center justify-between gap-8">
   <h1 class="md:animate-typing md:border-r-3 border-r-darkblue-300 text-xl lg:text-2xl font-bold font-['Poppins'] bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] inline-block text-transparent bg-clip-text antialiased">TRANSCENDENCE</h1>
   
   <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center w-8 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
</div>

<div class="hidden w-full md:block" id="navbar-default">
<ul id="nav-links" class="flex flex-col md:flex-row items-center justify-center gap-6 2xl:gap-9 text-barwhite text-2xl font-glacial antialiased">
    <li class="hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear">Accueil</li>
    <li class="hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear">Pong</li>
    <li class="hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear">Discussions</li>
    <li class="hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear">Github</li>
    </ul>
</div>
        ${
            new BorderedButton("login", "Connexion").build().getElement()?.innerHTML
        }
</div>
 </div>
</nav>`
        return this;
    }
}
