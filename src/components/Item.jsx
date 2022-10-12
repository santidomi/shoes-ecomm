
import {Link} from 'react-router-dom'


export default function Item (props){
    return(

        <div className="nikeProduct">
            <div className="nikeImg">
                    <img src={props.img} alt="nike" border="0" />
              
            </div>
            <div className="nikeTextContainer">
                <p className="nikeDescription"> {props.name} </p>
            </div>
            <div className="priceSection">
                <p className="nikePrecio">${props.price}</p>
                <Link to={`/item/${props.id}`}><button className="detailBtn">Ver detalles</button></Link>
            </div>
        </div>
    )
}


