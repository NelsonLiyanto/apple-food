import { Link } from "react-router-dom";

export default function Card(data){
    return (
        <div className="basis-1/4">
        <div className="card w-96 glass">
            <figure><img src={data.cuisine.imgUrl} className="w-full" alt="car!"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{data.cuisine.name}</h2>
                    <p>{data.cuisine.description}</p>
                    <div className="card-actions justify-end">
                    {data.displayButton && (
                        <Link to={`/detail/${data.cuisine.id}`} className="btn btn-primary">See cuisine!</Link>
                    )}
                    </div>
                </div>
        </div>
    </div>
    )
}