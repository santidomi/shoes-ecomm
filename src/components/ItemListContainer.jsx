
import ItemList from "./ItemList";

const ItemListContainer = (props) => {


    return(
        <div className="listContainer">
            <h1 className="listTitle">
                {props.greeting}
            </h1>
            <ItemList />
        </div>
    )
}

export default ItemListContainer;