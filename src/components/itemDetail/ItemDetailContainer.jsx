import ItemDetail from "./ItemDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneItem } from "../../utils/firebaseConfig";

const ItemDetailContainer = () => {
    const [dato, setDato] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getOneItem(id)
        .then(res => setDato(res))
    }, [id]);

    return (
        <div className="mainProductPage">
            {dato.name ? (
                <ItemDetail item={dato} />
            ) : (
                <p className="loader">Cargando...</p>
            )}

        
        </div>
    );
};

export default ItemDetailContainer;