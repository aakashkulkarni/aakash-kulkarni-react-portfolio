import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            data: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(i => {
                return i.category === filter;
            })
        })
    }

    getPortfolioItems() {
        axios
          .get("https://aakashkul.devcamp.space/portfolio/portfolio_items")
          .then(response => {
            this.setState({
                data: response.data.portfolio_items
            })
          })
          .catch(error => {
            console.log(error);
          });
      }

    portfolioItems() {
        return this.state.data.map(i => {
            return <PortfolioItem key={i.id} item={i}/>;
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter("Consulting")}>Consulting</button>
                <button className="btn" onClick={() => this.handleFilter("Software Development")}>Software Development</button>
                <button className="btn" onClick={() => this.handleFilter("Customer Success")}>Customer Success</button>
                {this.portfolioItems()}
            </div>
        );
    }
}