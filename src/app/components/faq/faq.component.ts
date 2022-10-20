import { Component, OnInit, OnChanges } from "@angular/core";
import { FAQService } from "../../services";

import faqSplash from "../../../assets/img/faq_splash.jpg";


@Component({
    selector: "faq",
    styleUrls: [ "./faq.component.scss" ],
    templateUrl: "./faq.component.html"
})
export class FAQComponent {

    faqSplash = faqSplash;
    searchString = "";


    constructor(public fs: FAQService) {

    }


    onKey(event: any) {
        this.searchString = event.target.value;
    }


    faqData = [
        {
            "q": "Why do you use the subscription model?",
            "a": `After being in the business of creating ERP software for many years, a few things have become very clear.
                ERP software is never straightforward. It means something different for everyone and everyone approaches it with different expectations. While some software companies will be upfront and tell you how much work it will be to get the software running in your application and how much you will have to invest in time and money to make it work, many others are just anxious to sell you the ‘package’, often with the promise that they will make sure you get up and running and they will hold your hand the whole way. Unfortunately, short of a several hundred thousand dollar commitment and a dedicated on site support person for a year or more, this is simply not a workable solution. Even if it does work the results are often not lasting for a simple reason – you have likely not developed your own in house liaison that has both a good working knowledge of your methods and needs as well as a growing understanding of how to work with the ERP software. Having this in house resource is absolutely critical to the success of any ERP implementation.
                We don’t believe that there is a one size fits all solution to ERP in the woodworking industry. Each shop will have different needs, not all shops will have access to the perfect IT employee to help them move forward with ERP, and some shops may only want to utilize a limited set of functions for several years until they grow their business to a higher level. It also may be that a shop that thinks it is ready for an ERP system is not.
        
                For these reasons we have decided to develop a model where you, the ERP user, can get the maximum benefit and choice for the least amount of risk and financial exposure. Instead of charging 40-70,000 for software that has been well presented and packaged but may not work well or suit your needs, you can start with a low monthly or annual charge allowing you to discontinue at any time if the software is not giving you the value you need. If you choose to discontinue, your financial exposure is almost nothing, as opposed to the full cost of the software with the traditional model.
            `
        },
        {
            "q": "What happens if we love the software but don’t want to keep paying annually?",
            "a": `You can buy a license in perpetuity for a reasonable fixed amount at any time after the first year. The cost of this license will be disclosed to you when you begin your subscription service and is guaranteed not to change for at least 2 years. There will still be an annual update fee for access to the latest versions of the software, but the software will continue to work even if you choose not to update.`
        },
        {
            "q": "What if you choose to raise the annual subscription amount unreasonably – won’t we be stuck?",
            "a": `No – we guarantee in writing that the annual fee will not be raised without at least a year’s notice and with the option to buy a license in perpetuity for the same reasonable fixed amount quoted to you when you began the subscription.
                We can also guarantee that price increases, if required, will be modest and in keeping with inflation and added features that the software contains.
                `
        },
        {
            "q": "We understand that this is a small company with a small development team. What happens if a key person leaves the company?",
            "a": "We are a small company with a limited development team (by the way, this is also what makes us innovative and responsive) however, we have strategic partnerships with two large well established companies, Automatech Robotic and Muskoka Cabinet Company. These two vital partnerships not only ensure continuity and continued support if a key person within SMART leaves or is no longer able to work with the company. They also provide logistical and innovative support to help make the software increasingly sophisticated and capable to fulfill your growing needs."
        }, 
        {
            "q": "What if we need something special for our business and you are not willing or able to supply it?",
            "a": "Some of the core code libraries are accessible to your developers. Using these core code libraries (dlls) you can create plug-ins that will be accessible within the SMART framework and can act on any of the data that SMART collects and maintains. This Plug-in functionality allows you virtually unlimited flexibility to use your own development resources to create the specific functions you may require."
        }
    ]
}