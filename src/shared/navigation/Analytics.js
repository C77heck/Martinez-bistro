import {useHttpClient} from "../hooks/http-hook";
import {AuthContext} from "../context/auth-context";
import {useContext, useEffect, useState} from "react";
import {Storage} from "../../utility/Storage";
import Modal from "../UIElements/Modal";
import Button from "../UIElements/Button";
import {Hr} from "../UIElements/Hr";

export const Analytics = (props) => {
    const session = new Storage('session');
    const [show, setShow] = useState(false);
    const {sendRequest} = useHttpClient();
    const {sessionId, setUpAnalytics} = useContext(AuthContext);

    const getIsExpired = (createdAt) => {
        const createdAtValue = new Date(createdAt);
        const createdValueOf = createdAtValue.setHours(createdAtValue.getHours() + 1);
        const nowValue = (new Date()).valueOf()

        return nowValue > createdValueOf.valueOf();
    }

    useEffect(() => {
        if (!sessionId) {
            const sess = session.get();

            if (!sess) {
                setTimeout(() => setShow(true), 4000)
            }
        }
    }, [])

    const manageAnalytics = async (isAccepted) => {
        try {
            const sessionId = await sendRequest(`${process.env.REACT_APP_ENDPOINT}analytics`);

            setUpAnalytics(sessionId, isAccepted);

            setShow(false);
        } catch (e) {
            console.log(e);
            setShow(false);
        }
    }

    return <Modal
        show={show}
        onCancel={() => setShow(false)}
        className={''}
    >
        <h2 className={'fs-22 pb-2'}>Az Ön adatainak védelme fontos a számunkra</h2>
        <p className={'fs-18 text-align-left pb-2'}>Mi és a partnereink információkat – például sütiket – tárolunk egy
            eszközön vagy
            hozzáférünk az eszközön
            tárolt információkhoz, és személyes adatokat – például egyedi azonosítókat és az eszköz által küldött
            alapvető információkat – kezelünk személyre szabott hirdetések és tartalom nyújtásához, hirdetés- és
            tartalomméréshez, nézettségi adatok gyűjtéséhez, valamint termékek kifejlesztéséhez és a termékek
            javításához.Az Ön engedélyével mi és a partnereink eszközleolvasásos módszerrel szerzett pontos geolokációs
            adatokat és azonosítási információkat is felhasználhatunk. A megfelelő helyre kattintva hozzájárulhat ahhoz,
            hogy mi és a partnereink a fent leírtak szerint adatkezelést végezzünk.
            Felhívjuk figyelmét, hogy személyes adatainak bizonyos kezeléséhez nem feltétlenül szükséges az Ön
            hozzájárulása, de jogában áll tiltakozni az ilyen jellegű adatkezelés ellen. A beállításai csak erre a
            weboldalra érvényesek. Kérjük olvassa el <a
                className={'text-decoration-none hover-opacity'}
                href={'/gdpr'}>adatvédelmi
                szabályzatunkat</a></p>
        <Hr type={'grey'}/>
        <div className={'display-flex'}>
            <Button onClick={() => manageAnalytics(false)} buttonClass='btn--outline w-px-200'>Nem fogadom el</Button>
            <Button onClick={() => manageAnalytics(true)} buttonClass='btn--green w-px-200'>Elfogadom</Button>
        </div>
    </Modal>
}
