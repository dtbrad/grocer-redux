import React, { Component } from 'react';
import ProductsIndexTable from './products_index_table';
import ProductService from '../api/product_service';
import TokenHelper from '../auth/token_helper';
import Paginate from '../shared_components/paginate';
import TotalSpentChart from './total_spent_chart';

class ProductsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      desc: false,
      loaded: false,
      pageOfResources: [],
      perPage: 10,
      totalPages: 0,
    };

    this.loadProducts = this.loadProducts.bind(this);
    this.loadChart = this.loadChart.bind(this);
  }

  async componentDidMount() {
    await this.loadProducts({ desc: false, category: 'sort_name' }, this.loadChart());
  }

  async loadChart() {
    const response = await ProductService.getIndexChart();
    if (response.status !== 200) {
      this.setState({ error: response.data.errors[0] });
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      this.setState({
        chartData: response.data,
        loaded: true
      });
    }
  }

  async loadProducts(args) {
    if (this.props.isAuthenticated()) {
      const direction = args.desc === true ? 'desc' : 'asc';
      const category = args.category !== undefined ? args.category : null;
      const params = {
        user_id: args.user_id || null,
        category,
        direction: direction || null,
        page: args.page || null,
        per_page: args.per_page || this.state.perPage,
      };
      const response = await ProductService.getProducts(params);
      if (response.status !== 200) {
        this.setState({ error: response.data.errors[0] });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        this.setState(prevState => (
          {
            currentPage: args.page || prevState.currentPage,
            desc: args.desc,
            loaded: true,
            pageOfResources: response.data,
            perPage: args.per_page || prevState.perPage,
            sortCategory: args.category,
            totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || prevState.totalPages,
          }));
      }
    }
  }


  render() {
    // if (this.state.loaded !== true) {
    //   return <h4>Loading...</h4>;
    // }
    const chart = this.state.chartData ? (
      <TotalSpentChart chartData={this.state.chartData} />) : (
      null
    );

    return (
      <div>
        {chart}
        <div className="panel panel-default">
          <ProductsIndexTable
            pageOfResources={this.state.pageOfResources}
            desc={this.state.desc}
            loadProducts={this.loadProducts}
          />
        </div>
        <div className="text-center">
          <Paginate
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            loadTable={this.loadProducts}
            desc={this.state.desc}
          />
        </div>
      </div>
    );
  }
}

export default ProductsIndex;
