import React, { Component } from "react";


class ProductCategoryRow extends Component {
    render() {
        return (
            <tr><th colSpan="2">
                {this.props.category}
            </th></tr>
        );
    }
}

class ProductRow extends Component {
    render() {
        const {
            product: {
                stocked,
                name,
                price
            }
        } = this.props;
        const color = stocked ? "black" : "red";

        return (
            <tr>
                <td>
                    <span style={{color: color}}>{name}</span>
                </td>
                <td>{price}</td>
            </tr>
        );
    }
}

class ProductTable extends Component {
    render() {
        const {
            products,
            filterText,
            inStockOnly
        } = this.props;
        let lastCategory = null;

        const rows = products.reduce(function(memo, product) {
            if (product.name.indexOf(filterText) === -1 || (!product.stocked && inStockOnly)) {
                return memo;
            }
            if (product.category !== lastCategory) {
                memo.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            memo.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
            return memo;
        }, []);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const { onUserInput } = this.props;
        onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    }

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        ref="inStockOnlyInput"
                        onChange={this.handleChange}
                    />
                    {" "}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            inStockOnly: false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }

    render() {
        const { products } = this.props;
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

export default class App extends Component {
    render() {
        return (
            <FilterableProductTable products={PRODUCTS} />
        );
    }
}
