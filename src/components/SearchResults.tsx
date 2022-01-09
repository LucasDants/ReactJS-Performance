import { List, ListRowRenderer, /*AutoSizer*/ } from 'react-virtualized'
import { ProductItem } from "./ProductItem"
interface SearchResultsProps {
    results: Array<{
        id: number
        price: number
        priceFormatted: string
        title: string
    }>
    totalPrice: number
    onAddToWishList: (id: number) => void
}

export function SearchResults({results, onAddToWishList, totalPrice}: SearchResultsProps) {
    const rowRenderer: ListRowRenderer = ({ index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem product={results[index]} onAddToWishList={onAddToWishList} />
            </div>
        )
    }


    return (
        <div>
            <h2>{totalPrice}</h2>
        <List
            height={300}
            rowHeight={30} // altura do item
            width={900}
            overscanRowCount={5} //quantos itens são deixados precarregados que não estão visiveis
            rowCount={results.length} // quantidade de itens
            rowRenderer={rowRenderer}
        />

            {/* {results.map(product => {
                return (
                    <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList} />
                )
            })} */}

        </div>
    )
}