import React from 'react';
import './App.css';

import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
    board:'',
		boards: [
			{
        title: 'FAMILY',
        items: [ 'Antonio', 'Nelly', 'Ade' ],
        item: ''
			},{
        title: 'FRIENDS',
        items: [ 'Maura', 'Alexis', 'Barani'],
        item: ''
			}
		]
  };
  

addBoard = () => {

  const nextState = produce(this.state, (draft)=> {
      draft.boards.push({
          title:this.state.board,
          items: [ 'Default' ],
          item: ''
      });
  })

  this.setState(nextState);
  this.setState({ board: ''}); 
};
  
removeBoard = (index) =>{
  const nextState = produce(this.state, (draft) => {
    draft.boards.splice(index, 1);
  });
  this.setState(nextState);
} 

addItem = (event,i) => {
  const nextState = produce(this.state, (draft) => {
    draft.boards[i].items = draft.boards[i].items.concat(draft.boards[i].item);
    draft.boards[i].item = '';
  });
  this.setState(nextState);
};

removeItem = (j,index) =>{
  const nextState = produce(this.state, (draft) => {
    draft.boards[j].items.splice(index, 1);
  });
  this.setState(nextState);
}

onHandleBoard= (event)=>{
  const valor = event.target.value;
  this.setState({board: valor});
}

onHandleItem= (event,i)=>{
  const value = event.target.value;
  const nextState = produce(this.state, (draft) => {
    draft.boards[i].item = value;
  });
  this.setState(nextState);
}

  render (){

    const { boards } = this.state;    
    return(
    <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <h4 className="t_white">
            MY BOARDS
            <span className="badge badge-pill badge-light ml-2">
                { this.state.boards.length }
            </span>
          </h4>
        </nav> 
      <div className="container">
        <br></br>  

          <div className="form-group row">
            {/*<div className="form-group col-md-1">
              <label className="font-weight-bold" htmlFor="yuno">Y1</label>
            </div>
            <div className="form-group col-md-3">
              <input type="text" className="form-control" id="yuno" placeholder="Y1 AXIS" value= {this.state.yuno} onChange={(event) => this.addyuno(event)}/>
            </div>
          <div className="form-group">
              <button className="btn-xs btn-success "><i className="fa fa-plus-circle"></i> </button>
  </div> */}
          </div> 

          <div className="form-group row">
            <div className="form-group col-md-2">
              <label className="font-weight-bold" htmlFor="ydos">Board Name</label>
            </div>
            <div className="form-group col-md-3">
              <input type="text" className="form-control" id="txt_name" placeholder="Add Board" value= {this.state.board} onChange={(event) => this.onHandleBoard(event)} />
            </div>
            <div className="form-group">
              <button onClick={() => this.addBoard()} className="btn-xs btn-success"><i className="fa fa-plus-circle"></i> Add New</button>
            </div>
          </div>  
        
        <div className="form-group row">

        {boards.map((data, j) => (

          <div className="col-md-3" key={'b'+j}>
                <div className="card border-info mb-3">
                  <div className="card-header bg-transparent border-info">

                    <div className="form-group row">
                        <div className="form-group col-md-10">
                          <h5>{ data.title }</h5>
                        </div>
                        <div className="form-group">
                            <button className="btn-xs btn-danger" onClick={() => this.removeBoard(j)}>
                              <i className="fa fa-trash"></i>
                            </button>
                        </div>
                      </div>

                  </div>
                  <div className="card-body text-success">

                    <ul className="list-group">

                    { boards[j].items.map((item, i) => (

                          <li key={'c'+i} className="list-group-item d-flex justify-content-between align-items-center">{item}
                            <button className="btn-xs btn-danger" onClick={() => this.removeItem(j,i)}>
                              <i className="fa fa-times"></i>
                            </button>
                          </li>
                    ))}
                      
                    </ul>  

                  </div>

                  <div className="card-footer bg-transparent border-info">
                    <div className="form-group row">
                      <div className="form-group col-md-10">
                        <input type="text" className="form-control" id="txt_item" placeholder="Add Item" value= {this.state.boards[j].item} onChange={(event) => this.onHandleItem(event,j)}/>
                      </div>
                      <div className="form-group">
                          <button className="btn-xs btn-success " onClick={(event) => this.addItem(event,j)} ><i className="fa fa-plus-circle"></i> </button>
                      </div>
                    </div>
                  </div>

                </div>
          </div>
      ))}

        </div>           
            
        </div>
        <br></br>
        <br></br>

    </div>
    );
  }
}

export default App;
