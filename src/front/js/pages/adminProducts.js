import React, { useEffect, useState, useMemo } from "react";

const AdminProducts = () => {
    const [products, setProducts] = useState(null)
    const [pageView, setPageView] = useState({ view: [1, 2, 3, 4, 5], pages: null, isPreviousEnable: false, isNextEnable: true })
    const viewLength = pageView.view.length

    useEffect(() => {
        const getProduct = async () => {
            const respond = await fetch(process.env.BACKEND_URL + '/api/products')
            const dataJson = await respond.json()
            const views = Math.ceil(dataJson.total_pages / viewLength)
            setProducts(dataJson)
            setPageView({ ...pageView, pages: views })
        }
        getProduct()
    }, [])

    function handleClickNext() {
        const array = Array.from(pageView.view, (x) => x + viewLength);
        //console.log(pageView.view[0])
        if (pageView.view[0] == 1) {
            setPageView({ ...pageView, view: array, isPreviousEnable: true })
        } else setPageView({ ...pageView, view: array })


    }

    function handleClickPrevious() {
        console.log(pageView.view[0] - viewLength)
        const array = Array.from(pageView.view, (x) => x - viewLength);
        if (pageView.view[0] - viewLength != 1) {
            setPageView({ ...pageView, view: array })
        } else {
            console.log('porque no cambias')
            setPageView({ ...pageView, view: array, isPreviousEnable: false })
        }
    }

    return (
        <section className="d-flex flex-column mt-5 w-75 mx-auto">
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Descrption</th>
                        <th scope="col">State</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.results.map((product, item) => {
                            return (
                                <tr key={item}>
                                    <th scope="row">{item + 1}</th>
                                    <td><div className="d-flex align-items-center">
                                        <img
                                            src={product.image_url}
                                            alt="IMG"
                                            style={{ width: "55px", height: "55px" }}
                                            className="rounded-circle"
                                        />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{product.name}</p>

                                        </div>
                                    </div></td>
                                    <td><p className="text-muted mb-0">{product.description}</p></td>
                                    <td><span className="badge rounded-pill bg-success">Active</span></td>
                                    <td className="text-center"><span>{product.quantity}</span></td>
                                    <td><span>{parseFloat(product.price).toFixed(2) + "$"}</span></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={pageView.isPreviousEnable ? 'page-item mx-0' : 'page-item mx-0 disabled'}>
                        <a className="page-link" tabIndex="-1" aria-disabled="true" onClick={handleClickPrevious}>Previous</a>
                    </li>
                    {
                        pageView.view.map((page, item) => {
                            console.log(page, products?.total_pages)
                            return <li key={item} className="page-item mx-0"><a className="page-link" >{page}</a></li>
                        })
                    }

                    <li className="page-item mx-0">
                        <a className="page-link" onClick={handleClickNext}>Next</a>
                    </li>
                </ul>
            </nav>
        </section>
    )

}

export default AdminProducts;