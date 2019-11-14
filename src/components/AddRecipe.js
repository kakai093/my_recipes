import React, {Component} from 'react';
import { RecipeContext } from '../contexts/RecipeContext';
import moment from 'moment';

class AddRecipe extends Component{

    static contextType = RecipeContext;

    constructor(props) {
        super()
        this.state = {
            title: '',
            description: '',
            ingredients: [''],
            procedures: [''],
            dish: 'not-specified'
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.context;
        const recipe = {
            id: Date.now(),
            title: this.state.title,
            description: this.state.description,
            ingredients: this.state.ingredients,
            procedures: this.state.procedures,
            dish: this.state.dish,
            date: moment().format('LLL')
        }
        dispatch({
            type: 'ADD_RECIPE',
            payload: recipe
        });
        this.setState({
            title: '',
            description: '',
            ingredients: [''],
            procedures: [''],
            dish: 'not-specified'
        })
        alert('Success Adding Recipe');
    }

    render() { 

        const { title, description, dish, ingredients, procedures } = this.state

        return (
            <div className="form-add card container">
                <h2 className="card-title">Add Recipe</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label><br/>
                        <input className="form-control" type="text" name="title" value={title} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label><br/>
                        <textarea className="form-control" rows="2" type="text" name="description" value={description} onChange={this.handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dishType">Dish Type</label>
                        <select className="form-control" id="dishType" value={dish} onChange={(e) => this.onOption(e)}>
                            <option value="not-specified">Not Specified</option>
                            <option value="chicken">Chicken</option>
                            <option value="beef">Beef</option>
                            <option value="pork">Pork</option>
                            <option value="seafood">Seafood</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="side-dish">Side Dish</option>
                            <option value="desert">Desert</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ingredients:</label>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <div key={index} className="add-tab">
                                    <div className="add-input">
                                        <input className="form-control" value={ingredient} onChange={(e) => this.onChangeIngredient(e, index)} required/>
                                    </div>
                                    <div>
                                        <button className="btn btn-remove" onClick={(e) => this.removeIngredient(e, index)}>Remove</button>
                                    </div>
                                </div>
                            );
                        })}
                        <br/><button onClick={this.addIngredient} className="btn btn-secondary btn-add">Add Ingredient</button>
                    </div>
                    <div className="form-group">
                        <label>Procedure:</label>
                        {procedures.map((procedure, index) => (
                            <div key={index} className="add-tab">
                                <div className="add-input">
                                    <textarea className="form-control" rows="3" type="text" value={procedure} onChange={(e) => this.onChangeProcedure(e, index)} required/>
                                </div>
                                <div>
                                    <button className="btn btn-remove" onClick={(e) => this.removeProcedure(e, index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <br/><button onClick={this.addProcedure} className="btn btn-secondary btn-add">Add Procedure</button>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </form>
            </div>
        )

    }

    onOption = (e) => {
        this.setState({dish:e.target.value})
    }

    onChangeIngredient(e, index) {
        const temp = [...this.state.ingredients];
        temp[index] = e.target.value;
        this.setState({ingredients:temp})
    }

    addIngredient = (e) => {
        e.preventDefault();
        const values = [...this.state.ingredients];
        values.push('');
        this.setState({ingredients:values})
    }

    removeIngredient = (e, index) => {
        e.preventDefault();
        const values = [...this.state.ingredients];
        if(index >= 1) {
            values.splice(index, 1);
            this.setState({ingredients:values})
        }
    }

    onChangeProcedure(e, index) {
        const temp = [...this.state.procedures];
        temp[index] = e.target.value;
        this.setState({procedures:temp})
    }

    addProcedure = (e) => {
        e.preventDefault();
        const values = [...this.state.procedures];
        values.push('');
        this.setState({procedures:values})
    }

    removeProcedure = (e, index) => {
        e.preventDefault();
        const values = [...this.state.procedures];
        if(index >= 1) {
            values.splice(index, 1);
            this.setState({procedures:values})
        }
    }
}

export default AddRecipe;