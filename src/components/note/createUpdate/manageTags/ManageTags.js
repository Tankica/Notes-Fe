import React, {Component} from "react";
import '../../note.css';
import api from "../../../../apis/api";

export default class ManageTags extends Component {

    state = {
        tags: {},
        tagsId: [],
        init: true
    };

    componentDidMount() {
        api.tags().getAll().then((request) => this.setState({tags: request.data}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tags && this.props.tags.length > 0 && this.state.init) {
            this.setState({tagsId: [...this.state.tagsId, ...Object.values(this.props.tags).map(tag => tag.id)]});
            this.setState({init: false});
        }
    }

    onAddTag = () => this.setState({
        tagsId: [...this.state.tagsId, parseInt(this.state.tag)]
    }, () => this.props.updateTagsId(this.state.tagsId));


    deleteTag(tagId, event) {
        event.preventDefault();
        let array = [...this.state.tagsId];
        let index = this.state.tagsId.indexOf(tagId);
        array.splice(index, 1);
        this.setState({tagsId: array}, () => this.props.updateTagsId(this.state.tagsId));
    };

    onChangeData = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <select className="form-control mb-4" name="tag" onChange={this.onChangeData}
                                defaultValue="disable">
                            <option value="disable" disabled>Choose Tag</option>
                            {Object.values(this.state.tags)
                                .map(tag => <option value={tag.id} key={tag.id}>{tag.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <button className="buttons form-control mb-4 w-100" type="button"
                                onClick={this.onAddTag}>Add
                        </button>
                    </div>
                </div>
                {Object.values(this.state.tags)
                    .filter(value => this.state.tagsId.includes(value.id))
                    .map(value =>
                        <a href="/#" onClick={(event) => this.deleteTag(value.id, event)} key={value.id}>
                            <h4 className="badge badge-pill mr-3">#{value.name}&nbsp;
                                <i className="material-icons">clear</i>
                            </h4>
                        </a>
                    )}
            </div>
        );
    }
}


