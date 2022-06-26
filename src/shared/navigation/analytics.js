import {useHttpClient} from "../hooks/http-hook";

export const Analytics = (props) => {
    const {sendRequest} = useHttpClient();
    const manageAnalytics = async (isAccepted) => {
        try {
            const sessionId = await sendRequest(`${process.env.REACT_API_ENDPOINT}/analytics`);

            if(isAccepted){

            }
        } catch (e) {
            console.log(e);
        }
    }

    return <div>

    </div>
}
