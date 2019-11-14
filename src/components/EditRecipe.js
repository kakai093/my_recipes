import React, {Component} from 'react';
import { RecipeContext } from '../contexts/RecipeContext';
import moment from 'moment';

class EditRecipe extends Component{

    static contextType = RecipeContext;

    constructor(props) {
        super()
        this.state = {
            title: '',
            description: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.context;
        const editedRecipe = {
            newTitle: this.state.title,
            newDescription: this.state.description,
            edit: this.props.match.params.id,
        }
        dispatch({
            type: 'EDIT_RECIPE',
            payload: editedRecipe
        });
        alert('Success Editing Recipe');
        this.props.history.push('/recipe')
    }

    render() { 
        const { recipe } = this.context;
        const route_id = this.props.match.params.id;
        return (
            <div className="form-add card container">
                <h2 className="card-title">Edit Recipe</h2>
                {recipe.map((recipe) => (
                    recipe.id == route_id ?
                    <form key={recipe.id} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title</label><br/>
                            <input className="form-control" type="text" name="title"defaultValue={recipe.title} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label><br/>
                            <textarea className="form-control" rows="2" type="text" name="description" defaultValue={recipe.description} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>:
                    null
                ))}
            </div>
        )
    }

}

export default EditRecipe;