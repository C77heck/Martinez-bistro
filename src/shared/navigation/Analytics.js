import {useHttpClient} from "../hooks/http-hook";
import {AuthContext} from "../context/auth-context";
import {useEffect} from "react";
import {Storage} from "../../utility/Storage";
import Modal from "../UIElements/Modal";
import Button from "../UIElements/Button";

export const Analytics = (props) => {
    const session = new Storage('session');
    const [show, setShow] = useState(false);
    const {sendRequest} = useHttpClient();
    const {sessionId, setUpAnalytics} = useContext(AuthContext);

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
            const sessionId = await sendRequest(`${process.env.REACT_API_ENDPOINT}/analytics`);

            if (isAccepted) {
                setUpAnalytics(sessionId);
            }

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
        <h2>Header</h2>
        <p>some description</p>
        <div className={'display-flex'}>
            <Button onClick={() => manageAnalytics(false)} buttonClass='btn--save'>Nem fogadom el</Button>
            <Button onClick={() => manageAnalytics(true)} buttonClass='btn--green'>Elfogadom</Button>
        </div>
    </Modal>
}
