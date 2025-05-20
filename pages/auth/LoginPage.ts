import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import Page from "@classes/Page";
import FormComponent from "@dcomponents/FormComponent";
import TextFieldComponent from "@dcomponents/TextFieldComponent";

export default class LoginPage extends Page {

    public constructor() {
        super("LoginPage", new NavBar({}));

        this.addComponent(this.buildTest());
        this.addComponent(new Footer().build())
        super.render();
    }


    public buildTest(): FormComponent {

        const inputEmail = new TextFieldComponent({
            id: "email",
            type: "email",
            placeholder: "your-email@example.fr",
            required: true,
            autoComplete: "email",
            className: "w-full h-[52px] bg-transparent rounded-xl border border-white/5 pl-10 text-[#c9c9c9]/50"
        });


        const form =  new FormComponent({
            id: "loginForm", className: "w-full h-screen", children: [inputEmail]
        });

        form.addComponent(inputEmail);

       return form;
    }

}

/*
   <div class="relative flex flex-row items-center justify-center">
                <div class="left-3 top-1/2 absolute -translate-y-1/2 w-5 h-5 overflow-hidden bg-white/40"></div>
                <input type="email" placeholder="exemple.email@gmail.com" class="w-full h-[52px] bg-transparent rounded-xl border border-white/5 pl-10 text-[#c9c9c9]/50"/>
            </div>
 */