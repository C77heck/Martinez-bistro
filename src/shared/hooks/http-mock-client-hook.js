import * as moment from 'moment';
import {addId} from "../../utility/addId";

export const useHttpMockClient = () => {

    const getStory = () => {
        const expiry = moment().add(1, 'year').valueOf()

        return {
            expiry,
            story: {
                "_id": "6030fe8765bf4b4a08e14aa6",
                "firsth2": "ÍZBEN GAZDAG KONYHA, ELÉRHETŐ ÁRON!",
                "firsth3": "ÍLYET MÁSHOL NEM KAPSZ!",
                "firstp": "Az ételek a legfrissebb helyi alapanyagokból nagy szakértelemmel vannak elkészítve. Nálunk belekóstolhatsz a mexikói ízek gazdag kavalkádjába, de ha a jó hazait kívánod, abból is van bőven. Ezt a séfünk több évtizedes tapasztalata biztosítja.",
                "secondh2": "ÍMÁDNI FOGOD AZ ÉTELEINKET!",
                "secondp": "Próbálj ki minket és érezz rá a mexikói feelingre meg hogy nem csak beszélünk, hanem teljesítünk is! Nálunk nincs kompromisszum kötés az ételek minőségét illetően. És odafigyelünk, hogy a tőlünk kikerült étel csak természetes alapanyagokat és főszereket tartalmazzon.",
                "__v": 0
            },
        }
    }
    const getOpeningTimes = () => {
        return {
            expiry: moment().add(1, 'year').valueOf(),
            opening: {
                "_id": "60242d4c11671309b87c4858",
                "monday": "Zárva",
                "tuesday": "11:00-20:00",
                "wednesday": "11:00-20:00",
                "thursday": "11:00-20:00",
                "friday": "11:00-20:00",
                "saturday": "11:00-20:00",
                "sunday": "Zárva",
                "__v": 0
            },
        }
    }
    const getTestimonial = () => {
        return {
            expiry: moment().add(1, 'year').valueOf(),
            testimonial: {
                "_id": "6025917374b1717a6cecd631",
                "quote": "A FŐZÉS IS EGY MŰVÉSZETI FORMA!",
                "text": "Közel 21 éve koptatom már a konyha kövét. Gyerekkoromtól kezdve a vendéglátás vett körül, talán mondhatom, hogy ebben nőtem fel. Édesanyámtól tanultam főzni, és a mai napig gyakran merítek ihletet a családi receptekből. Az étterem működésében egy mexikói bisztró és egy mai magyar kortárs családi étterem ötvözeteként képzeltem el és alapítottam meg.",
                "__v": 0
            },
        }
    }
    const getExpiries = () => {
        const expiry = moment().add(1, 'year').valueOf();
        return {
            "_id": "60313c0faf59c72ca42410d2",
            "menu": expiry,
            "testimonial": expiry,
            "opening": expiry,
            "story": expiry,
            "__v": 0
        }
    }
    const getMenu = () => {
        const expiry = moment().add(1, 'year').valueOf();

        const menu = {
            expiry,
            menu: [
                {
                    "_id": "602ab32b3eb25e96b17f3121",
                    "name": "Churros",
                    "description": "epres, karamell vagy csoki öntet",
                    "price": "1290",
                    "type": "desserts",
                    "__v": 0
                },
                {
                    "_id": "602ab4153eb25e96b17f3126",
                    "name": "Pepsi 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "62679aae4c2a982309e453cf",
                    "name": ". fajitas de res - mexikói fajitas",
                    "description": "tortilla, marharagu, rizs, babpüré, salsa, fűszeres tejföl, sajtos rizzsel",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679b3e4c2a982309e453f5",
                    "name": "Mexico-i",
                    "description": "csirkés wrap, sajtos quesadilla, mexikói burrito, corn flakes morzsában forgatott\n  csirkemell csíkok, csónakburgonyával, házi majonézes káposztasaláta, \n  zöld fűszeres mártogatós, salsa",
                    "price": "6900",
                    "type": "double",
                    "__v": 0
                },
                {
                    "_id": "62679b5a4c2a982309e453fc",
                    "name": "Grilltál",
                    "description": "rostonsült csirkemell, sertés tarja fokhagymáson, fűszeres szűzérmék, grill zöldség,\nhasábburgonyával",
                    "price": "7900",
                    "type": "double",
                    "__v": 0
                },
                {
                    "_id": "62679b734c2a982309e45408",
                    "name": "Vegyestál",
                    "description": "cigánypecsenye, corn flakes bundában csirkemell, töltötthúsit, csónakburgonya, \nházi majonézes káposztasaláta",
                    "price": "7900",
                    "type": "double",
                    "__v": 0
                },
                {
                    "_id": "62679be84c2a982309e4542c",
                    "name": "guacamole",
                    "description": "",
                    "price": "750",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "6267c61a45a3f0cd5120ce5b",
                    "name": "Cheddar cheese cream - Cheddar sajtkrémleves",
                    "description": "cheddar sajtkrémleves, bacon, tortilla chips",
                    "price": "750",
                    "type": "soups",
                    "__v": 0
                },
                {
                    "_id": "6267c7d345a3f0cd5120ce69",
                    "name": "medallones de serdito en salsa de champinones - roston sült szűzérmek vargánya gomba mártással",
                    "description": "sertés szűz gomba mártással csónak burgonyával",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8a745a3f0cd5120ce87",
                    "name": "cerdito relleno empanisado - töltött sertéskaraj",
                    "description": "töltött hús bundában, vegyes körettel",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8e645a3f0cd5120cea3",
                    "name": "pollito ala wilson - Willi kedvence",
                    "description": "mexikói pácban érlelt csirkemell csíkok, saláta, paradicsom, paprika, \nhasábburgonya, fűszeres tejföl",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c9cb45a3f0cd5120ceda",
                    "name": "7 up 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca4c45a3f0cd5120cf05",
                    "name": "Topjoy 0,25l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca9545a3f0cd5120cf28",
                    "name": "MELANGE",
                    "description": "",
                    "price": "650",
                    "type": "coffees",
                    "__v": 0
                },
                {
                    "_id": "6267cadf45a3f0cd5120cf4b",
                    "name": "DESPERADO 033L",
                    "description": "",
                    "price": "700",
                    "type": "beers",
                    "__v": 0
                },
                {
                    "_id": "6267cbb945a3f0cd5120cf60",
                    "name": "PILSNER URQUELL 0,5l",
                    "description": "",
                    "price": "800",
                    "type": "tap-beers",
                    "__v": 0
                },
                {
                    "_id": "6267cc0845a3f0cd5120cf7c",
                    "name": "ÍZESÍTETT MOJITO MANGO, KAKTUSZ",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6267cc1945a3f0cd5120cf8a",
                    "name": "ÍZESÍTETT COLADA, MANGO, MARACUJA",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6267cc2145a3f0cd5120cf91",
                    "name": "CUBA LIBRE",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6267ccca45a3f0cd5120cfc0",
                    "name": "VODKA 4CL",
                    "description": "",
                    "price": "800",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6268eb664a9e04473b2870d7",
                    "name": "JOSE CUERVO ANEJEJO TEQUILA 4CL",
                    "description": "",
                    "price": "900",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "62679a204c2a982309e453a5",
                    "name": "quesadilla- vega quesadilla",
                    "description": "tortilla, babpüré, rizs, sajt, fűszeres tejföl, mexikói saláta, idényi salátával",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679a464c2a982309e453ac",
                    "name": "enchiladas en salsa roja - enchiladas mexikói szószban",
                    "description": "tortilla csirkeraguval töltve salsában, sajt, tejföl",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679ad74c2a982309e453dd",
                    "name": "chimichanga de res - marhás chimichanga",
                    "description": "sült tortilla, mexikóiragu, guacamole, salsa, fűszeres tejföl, salátával",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679b064c2a982309e453e9",
                    "name": "serdito al mexicano - sertés tarja mexikói módra",
                    "description": "sertéstarja, mexikóiszószban, hagymásbab, rizs, tortilla",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679fb345a3f0cd5120ce09",
                    "name": "Csirkemell csíkok kreol módra",
                    "description": "csirkemellcsíkok corn flakes bundában, salsa, mézes-mustáros mártogatós",
                    "price": "1590",
                    "type": "entries",
                    "__v": 0
                },
                {
                    "_id": "6267c5d445a3f0cd5120ce4c",
                    "name": "Tacos dorados – sült taco (3 db)",
                    "description": "csirkemellragu olajban sült göngyölt tortilla, sajt, saláta, guacamole, salsa, fűszeres tejföl mártogatós",
                    "price": "1590",
                    "type": "entries",
                    "__v": 0
                },
                {
                    "_id": "6267c64c45a3f0cd5120ce62",
                    "name": "Seasonal fruity cream - Szezonális gyümölcsleves",
                    "description": "",
                    "price": "750",
                    "type": "soups",
                    "__v": 0
                },
                {
                    "_id": "6267c7f245a3f0cd5120ce71",
                    "name": "serdito al mojo de hajo - sertés tarja fokhagymásan",
                    "description": "sertés tarja fokhagymásan hasábburgonya",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8d545a3f0cd5120ce9c",
                    "name": "pollito ahogado - lucskos csirkemell",
                    "description": "vegyes körettel",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c93345a3f0cd5120ceb1",
                    "name": "Limonádék 0,5l",
                    "description": "",
                    "price": "600",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267c9b845a3f0cd5120cecc",
                    "name": "Lipton tea 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267c9c345a3f0cd5120ced3",
                    "name": "Pepsi max 0,5L",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca5945a3f0cd5120cf0c",
                    "name": "Topjoy 0,25l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca6345a3f0cd5120cf13",
                    "name": "Hell",
                    "description": "",
                    "price": "400",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267cac745a3f0cd5120cf3d",
                    "name": "CORONA 0,33L",
                    "description": "",
                    "price": "700",
                    "type": "beers",
                    "__v": 0
                },
                {
                    "_id": "6267caec45a3f0cd5120cf52",
                    "name": "DREHER 0,5L",
                    "description": "",
                    "price": "800",
                    "type": "tap-beers",
                    "__v": 0
                },
                {
                    "_id": "6267caf945a3f0cd5120cf59",
                    "name": "DREHER MEGGY 0,3L",
                    "description": "",
                    "price": "650",
                    "type": "tap-beers",
                    "__v": 0
                },
                {
                    "_id": "6267cbfb45a3f0cd5120cf75",
                    "name": "MOJITO",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6267cc4045a3f0cd5120cf9f",
                    "name": "SATU",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6268ebb44a9e04473b287104",
                    "name": "EL JIMADOR ANEJO TEQUILA 2CL",
                    "description": "",
                    "price": "450",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "602a86133eb25e96b17f3102",
                    "name": "Bacon Cheeseburger",
                    "description": "marhahús, bacon, cheddar sajt, saláta, paradicsom, csemege uborka, hagyma, hasábburgonya",
                    "price": "1990",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602aab9a3eb25e96b17f3105",
                    "name": "Diablo burger",
                    "description": "marhahús erősen fűszerezve, bacon, cheddar sajt, saláta, paradicsom, hagyma, csemege uborka, extra erős szósz, hasábburgonya.",
                    "price": "1990",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602aabdf3eb25e96b17f3106",
                    "name": "Mexican burger",
                    "description": "marhahús, bacon, cheddar sajt, saláta, paradicsom, csemege uborka, hagyma, jalapeno paprika, hasábburgonya.",
                    "price": "1990",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602ab3913eb25e96b17f3122",
                    "name": "Csónak burgonya",
                    "description": "fdsafdsa",
                    "price": "750",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "602ab42f3eb25e96b17f3127",
                    "name": "Mirinda 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267992d4c2a982309e45342",
                    "name": "Serdito en bbq - bbq sertés tarja",
                    "description": "sertés tarja bbq-szószba forgatva, csónak burgonya",
                    "price": "2590",
                    "type": "platillos",
                    "__v": 0
                },
                {
                    "_id": "626799544c2a982309e4534e",
                    "name": "Pollo en bbq  - csirkemell steak bbq-szószban",
                    "description": "csirkemell steak bbq-szószban, házi majonézes káposztasaláta csónak burgonyával",
                    "price": "2590",
                    "type": "platillos",
                    "__v": 0
                },
                {
                    "_id": "62679a034c2a982309e4539d",
                    "name": "quesadillas de res - marhás quesadellas",
                    "description": "tortilla, sajt, paradicsom, saláta, marharagu, fűszeres tejföl, mexikói saláta, idényisalátával",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679a724c2a982309e453ba",
                    "name": "burrito de pollo - csirkés burrito",
                    "description": "tortilla, babpüré, rizs, sajt, csirkeragu, tejföl, guacamole, salsa, mexikói-rizssel",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "6267c83045a3f0cd5120ce79",
                    "name": "serdido con huevo fokhagymás tarja tükörtojással",
                    "description": "sertés tarja tükörtojással hasábburgonya",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8c645a3f0cd5120ce95",
                    "name": "pollito ala parrilla - rostonsült csirkemell",
                    "description": "rostonsült csirkemell, grill zöldségekkel",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267ca3245a3f0cd5120cef0",
                    "name": "Schweppes orange 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca8c45a3f0cd5120cf21",
                    "name": "CAPPUCCINO",
                    "description": "",
                    "price": "500",
                    "type": "coffees",
                    "__v": 0
                },
                {
                    "_id": "6267ca9e45a3f0cd5120cf2f",
                    "name": "LATTE MACCHIATO",
                    "description": "",
                    "price": "650",
                    "type": "coffees",
                    "__v": 0
                },
                {
                    "_id": "6267cad245a3f0cd5120cf44",
                    "name": "MILLER 0,33L",
                    "description": "",
                    "price": "700",
                    "type": "beers",
                    "__v": 0
                },
                {
                    "_id": "6267cc1245a3f0cd5120cf83",
                    "name": "PINA COLADA",
                    "description": "",
                    "price": "1490",
                    "type": "cocktails",
                    "__v": 0
                },
                {
                    "_id": "6267ccb945a3f0cd5120cfb2",
                    "name": "RUM 4CL",
                    "description": "",
                    "price": "800",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6267ccde45a3f0cd5120cfce",
                    "name": "JÄGERMAISTER 4CL",
                    "description": "",
                    "price": "900",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6267ccef45a3f0cd5120cfdc",
                    "name": "PÁLINKA 4CL",
                    "description": "",
                    "price": "900",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6267ccf645a3f0cd5120cfe3",
                    "name": "PÁLINKA 2CL",
                    "description": "",
                    "price": "450",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6268eb8b4a9e04473b2870ec",
                    "name": "JOSE CURVO BLANCO TEQUILA 2CL",
                    "description": "",
                    "price": "450",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6268ebae4a9e04473b2870fd",
                    "name": "EL JIMADOR ANEJO TEQUILA 4CL",
                    "description": "",
                    "price": "900",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "602aac0c3eb25e96b17f3107",
                    "name": "Burger de pollo",
                    "description": "csirkemell ropógos bundábanbundában, cheddar sajt, saláta, paradicsom, csemege uborka, hagyma csónak burgonya.",
                    "price": "1990",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602aac403eb25e96b17f3108",
                    "name": "Extrém burger",
                    "description": "dupla marhahús, bacon, cheddar sajt, saláta, paradicsom, csemege uborka,hagyma, csónak burgonya.",
                    "price": "2490",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602aac833eb25e96b17f3109",
                    "name": "Extrém cheeseburger",
                    "description": "dupla marhahús, bacon, cheddar sajt, saláta, paradicsom, hagyma, csemege uborka, extra sajtszósszal öntve, csónak burgonya.",
                    "price": "2490",
                    "type": "burgers",
                    "__v": 0
                },
                {
                    "_id": "602aacbc3eb25e96b17f310a",
                    "name": "Wrap de pollo - csirkés wrap",
                    "description": "Grillezett csirkemell, bacon, csemege uborka, tricolor paprika, hagyma, paradicsom, sajt, tortillaban, házi majonézes káposztasalátával és csónak burgonyával.",
                    "price": "2590",
                    "type": "platillos",
                    "__v": 0
                },
                {
                    "_id": "602aae323eb25e96b17f3110",
                    "name": "Quesadilla de pollo - csirkés quesadilla -",
                    "description": "sajt, tortilla, saláta, paradicsom, csirkemell, rostlapon sütve, saláta ágyon.",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "602ab39d3eb25e96b17f3123",
                    "name": "Hasábburgonya",
                    "description": "",
                    "price": "750",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "602ab3f53eb25e96b17f3125",
                    "name": "Majonéz, ketchup, jalapeno paprika, salsa",
                    "description": "",
                    "price": "300",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "626799744c2a982309e45355",
                    "name": "Wrap de res - mexikói wrap",
                    "description": "mexikói marharagu, tricolor paprika, hagyma, paradicsom, jalapeno paprika,\n sajt, salsa, házi majonézes káposztasaláta, csónak burgonya",
                    "price": "2590",
                    "type": "platillos",
                    "__v": 0
                },
                {
                    "_id": "62679a5a4c2a982309e453b3",
                    "name": "enciladas tricolor - enchiladas 3 szósszal",
                    "description": "tortilla csirkeragu, sajt, 3 szószban, zöld szósz, tejföl, mexikói szósz",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679a874c2a982309e453c1",
                    "name": "burrito de res - mexikói burrito",
                    "description": "tortilla, marharagu, jalapeno paprika, rizs, babpüré, mexikói salsa, guacamole, fűszeres tejföl",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679a9a4c2a982309e453c8",
                    "name": "fajitas de pollo - csirkés fajitas",
                    "description": "tortilla, csirkeragu, sajt, rizs, babpüré, salsa, fűszeres tejföl, sajtos rizzsel",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679abf4c2a982309e453d6",
                    "name": "chimicanga de pollo - csirkés chimichanga",
                    "description": "sült tortilla, csirkeragu, guacamole, salsa, fűszeres tejföl, salátával",
                    "price": "2590",
                    "type": "mexicanos",
                    "__v": 0
                },
                {
                    "_id": "62679b8d4c2a982309e4540f",
                    "name": "El jefe mexico-i fánkocskák",
                    "description": "",
                    "price": "1290",
                    "type": "desserts",
                    "__v": 0
                },
                {
                    "_id": "62679ba84c2a982309e45416",
                    "name": "el dulce beso",
                    "description": "csokis láva süti gyümölcs szósszal és vaníliafagylalttal",
                    "price": "1290",
                    "type": "desserts",
                    "__v": 0
                },
                {
                    "_id": "62679bf44c2a982309e45433",
                    "name": "házi majonézes káposztasaláta",
                    "description": "",
                    "price": "750",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "62679c0a4c2a982309e4543a",
                    "name": "mexicoi rizs",
                    "description": "",
                    "price": "750",
                    "type": "extras",
                    "__v": 0
                },
                {
                    "_id": "6267c5b945a3f0cd5120ce45",
                    "name": "Mandulaforgácsban sült sajt friss idénysalátával, édes vinaigrette öntettel",
                    "description": "",
                    "price": "1590",
                    "type": "entries",
                    "__v": 0
                },
                {
                    "_id": "6267c5f945a3f0cd5120ce53",
                    "name": "Strong-jalapeno cream - Csipős jalapeño krémleves",
                    "description": "erős jalapeno krémleves, tortilla chips",
                    "price": "750",
                    "type": "soups",
                    "__v": 0
                },
                {
                    "_id": "6267c86545a3f0cd5120ce80",
                    "name": "pata de oso - medvetalp",
                    "description": "óriás rántotthús házi majonézes saláta, hasábburgonya",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8b745a3f0cd5120ce8e",
                    "name": "pollito empanisado en corn flakes - corn flakes bundában csirkemell",
                    "description": "corn flakes csirkecsík, csónakburgonya, házi majonézes káposztasaláta",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c8f045a3f0cd5120ceaa",
                    "name": "pollito empanisado con salsa de queso - szégyenlős csirkemell",
                    "description": "sajtmártással hasábburgonya",
                    "price": "2890",
                    "type": "hungarian-dishes",
                    "__v": 0
                },
                {
                    "_id": "6267c94045a3f0cd5120ceb8",
                    "name": "Szénsavas ásványvíz 0,5L",
                    "description": "",
                    "price": "300",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267c94a45a3f0cd5120cebf",
                    "name": "Szénsavmentes ásványvíz 0,5L",
                    "description": "",
                    "price": "300",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca3e45a3f0cd5120cef7",
                    "name": "Schweppes tonic 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca4545a3f0cd5120cefe",
                    "name": "Canada dry 0,5l",
                    "description": "",
                    "price": "450",
                    "type": "drinks",
                    "__v": 0
                },
                {
                    "_id": "6267ca7845a3f0cd5120cf1a",
                    "name": "PRESSO",
                    "description": "",
                    "price": "450",
                    "type": "coffees",
                    "__v": 0
                },
                {
                    "_id": "6267caaa45a3f0cd5120cf36",
                    "name": "JÉGES KÁVÉ – szezonális",
                    "description": "",
                    "price": "650",
                    "type": "coffees",
                    "__v": 0
                },
                {
                    "_id": "6267cbc445a3f0cd5120cf67",
                    "name": "PILSNER URQUELL 0,3L",
                    "description": "",
                    "price": "650",
                    "type": "tap-beers",
                    "__v": 0
                },
                {
                    "_id": "6267cbec45a3f0cd5120cf6e",
                    "name": "SOMERSBY",
                    "description": "",
                    "price": "500",
                    "type": "tap-beers",
                    "__v": 0
                },
                {
                    "_id": "6267ccc145a3f0cd5120cfb9",
                    "name": "RUM 2CL",
                    "description": "",
                    "price": "400",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6267ccd245a3f0cd5120cfc7",
                    "name": "VODKA 2CL",
                    "description": "",
                    "price": "400",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6267cce645a3f0cd5120cfd5",
                    "name": "JÄGERMAISTER 2CL",
                    "description": "",
                    "price": "450",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6268eb734a9e04473b2870de",
                    "name": "JOSE CUERVO ANEJEJO TEQUILA 2CL",
                    "description": "",
                    "price": "450",
                    "type": "shots",
                    "__v": 0
                },
                {
                    "_id": "6268eb834a9e04473b2870e5",
                    "name": "JOSE CURVO BLANCO TEQUILA 4CL",
                    "description": "",
                    "price": "900",
                    "type": "shots",
                    "__v": 0
                }
            ],
        }
        const newMenu = addId(menu.menu);

        return newMenu;
    }

    return {getStory, getMenu, getOpeningTimes, getTestimonial, getExpiries}
}
