import React from "react";
import {fecthCryptoPrices} from "../../api";

export default function TokenDetails(){
    const [tokenDetails, setTokenDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { tokenId } = useParams();

}