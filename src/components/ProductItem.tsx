import dynamic from "next/dynamic"
import { memo, useState } from "react"
import { AddProductToWishListProps } from "./AddProductToWishList"
import lodash from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
   return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
    loading: () => <span>carregando...</span>
})
interface ProductItemProps {
    product: {
        id: number
        price: number
        priceFormatted: string
        title: string
    }
    onAddToWishList: (id: number) => void
}



function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false)


    // async function showFormattedDate() {
    //     const {format } = await import ('date-fns')
    //     format()
    // }

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
            {
                isAddingToWishList && (
                    <AddProductToWishList 
                        onAddToWishlist={() => onAddToWishList(product.id)} 
                        onRequestClose={() => setIsAddingToWishList(false)}
                    />
                )
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product)
})