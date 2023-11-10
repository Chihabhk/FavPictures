const baseUrl = "https://cataas.com/cat/" 
// const url = new URL(baseUrl)

export const CatCard = ({pic}, key) => {
    if (!pic || !pic._id) {
        console.error('Invalid pic or pic._id is missing', pic);
        return null; // No renderizar si pic o pic._id es undefined
    }
    const imageUrl = baseUrl + pic._id
    return(
    <li key={key}>
        <img src={imageUrl} alt={pic.tags.join(", ")} loading="lazy"/>
    </li>
    )
}