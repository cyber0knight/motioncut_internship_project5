import React from 'react'
import { useQuery} from "@tanstack/react-query"
import makeRequest from "../axios.js"
import Card from "./card.js"
import './styles.css'

export default function Menu() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['menu'],
        queryFn: () =>
          makeRequest.get('menu').then((res) => {
            return res.data;
          }),
      });

    // console.log(data);

    return (
        <div className='menu'>
            {
                error ? "Something went wrong!"
                : isLoading ? "loading"
                : data.map((item) => <Card item={item} key = {item.id} />)
            }
        </div>
    )
}
