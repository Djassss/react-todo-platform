import React, { useState } from 'react'
import {dotWhite, dotBlack, night, sun, sidebar, xMark, xMarkWHite, minusBlack, minusWhite, correctBlack, correctWhite, menuBlack, menuWhite, sideBlack} from '../module.js'


type AllBoards = {
  id: number;
  name: string;
  icn: string;
}
interface Boxs {
  id: number;
  price: string;
  title: string;
  icn: string;
}

const sections: Boxs[] = [
  {
    id: 1,
    title: 'Build UI or onboarding flow',
    price: '0 of 3 substaks',
    icn: correctWhite
  },
  {
    id: 2,
    title: 'Build UI for search',
    price: '0 of 1 substaks',
    icn: correctWhite
  },
  {
    id: 3,
    title: 'Build settings UI',
    price: '0 of 2 substaks',
    icn: correctWhite 
  },
  {
    id: 4,
    title: 'Design setting and search pages',
    price: '3 of 1 substaks',
    icn: correctWhite 
  },
  {
    id: 5,
    title: 'Add accaount management endpoints',
    price: '3 of 2 substaks',
    icn: correctWhite 
  },
  {
    id: 6,
    title: 'Design onboarding flow',
    price: '3 of 3 substaks',
    icn: correctWhite 
  },
  {
    id: 7,
    title: 'Add authentication endpoints',
    price: '0 of 1 substaks',
    icn: correctWhite 
  },
  {
    id: 8,
    title: 'Create wireframe prototype',
    price: '2 of 1 substaks',
    icn: correctWhite 
  },
  {
    id: 9,
    title: 'Review results of usability tests',
    price: '2 of 2 substaks',
    icn: correctWhite 
  },
  {
    id: 10,
    title: 'Market discovery',
    price: '4 of 1 substaks',
    icn: correctWhite 
  },
  {
    id: 11,
    title: 'Research the market',
    price: '4 of 2 substaks',
    icn: correctWhite 
  },
  {
    id: 12,
    title: 'Conduct 5 wireframe tests',
    price: '1 of 1 substaks',
    icn: correctWhite 
  },
]


 
const allBoards: AllBoards[] = [ 
  {
    id: 1,
    name: 'platform launch',
    icn: sidebar
  },
  {
    id: 2,
    name: 'marketing plan',
    icn: sidebar
  },
  {
    id: 3,
    name: 'Roadmap',
    icn: sidebar
  },
  {
    id: 4,
    name: 'create new board',
    icn: sidebar
  }
]


export const Main = () => {
const [toggleNight, setToggleNight] = useState(false);
const [isModal, setIsModal] = useState(false);
const [validation, setValidation] = useState('')
const [error, setError] = useState ('')
const [isNext, setIsNext] = useState(false);
const [isSidebar, setIsSidebar] = useState (false);
const [selectedTasks, setSelectedTasks] = useState<Boxs[]>([]);
const [togglePlus, setTogglePlus] = useState <{ [key: number]: boolean }> (
  sections.reduce<{ [key: number]: boolean }>((acc, section) => {
    acc[section.id] = false;
    return acc;
  }, {})
);

const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
  const value = e.target.value;
  setValidation(value);

  if(value.length <= 3) {
    setError('must be at least 3 characters long')
  } else{
    setError('')
  }
}


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (validation.length < 4) {
    setError('Invalid field');
  }else if(validation.length > 15) {
    setError('Title cannot exceed 15 characters');
  } 
  else if (selectedTasks.length >= 4) {
    setError('You can only have 4 tasks in your shop-card.');
  } else {
    const newTask: Boxs = {
      id: sections.length + 1, 
      title: validation,
      price: '', 
      icn: correctWhite, 
    };
    setSelectedTasks(prevTasks => [...prevTasks, newTask]);
    setValidation(''); 
    setIsModal(false); 
  }
};




const handleAddSubtask = (event: React.MouseEvent<HTMLButtonElement>) => {
  if (error || !validation) {
    return;
  }
};


function toggleSectionPlus(id: number) {
  if (selectedTasks.length < 4 || togglePlus[id]) {
    setTogglePlus(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }
}


function changeBackground () {
  setToggleNight(!toggleNight)
}
const addToDoList = (task: Boxs) => {
  setSelectedTasks((prevTasks) => [...prevTasks, task]);
}

  return (
    <>
    <header className={`header-light ${toggleNight ? 'header-night' : ''}`}>
        <h2>platform launch</h2>
        <button onClick={() => setIsModal(!isModal)}>+ add new task</button>
        
        <img 
          src={!toggleNight ? dotBlack : dotWhite}  />
    </header>


<div className={`sunlight ${toggleNight ? 'moonlight' : ''}`}>
    <div className='box'>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
  <h1> <div className='box'>
        <div className='div-1'></div>
        <div className='div-2'></div>
        <div className='div-3'></div>
    </div>kanban</h1>

    <div className='boards'>
      <h5>all boards (12)</h5>
      <ul>
        {allBoards.map(({id, icn, name}) => 
              <li 
              className={`platform`}
              key={id}>
              <img src={icn}/>
              <p>{name}</p>
            </li>
        )}
      </ul>
    </div>
    

<div className='toggle'>
  <img src={sun} />
    <button onClick={changeBackground} 
    className={`sun ${toggleNight ? 'moon' : false}`}><div></div></button>
  <img src={night} />
</div>

<div className='Todo-list-sidebar'>
  <span className={`card-light ${toggleNight ? 'card-dark' : false}`}>Shop-card</span>
  <ul>
    {selectedTasks.map((task) => (
        <li className={`light ${toggleNight ? 'dark' : false}`} key={task.id}>{task.title}


   <img
    src={!toggleNight ? xMarkWHite : xMark}
    onClick={(event) => {
    const taskId = Number(event.currentTarget.dataset.taskId);
    if (!isNaN(taskId)) {
      setSelectedTasks(prevTasks => prevTasks.filter(item => item.id !== taskId));
      toggleSectionPlus(taskId);
    }
  }}
    data-task-id={task.id} 
  />
</li>
      ))}
      
  </ul>
  </div>
</div>

<header className={`header-light-mobile ${toggleNight ? 'header-dark-mobile' : ''}`}>
        <h2>platform launch</h2>
        <button onClick={() => setIsModal(!isModal)}>+ add new task</button>
        
       {!isSidebar && <img 
          onClick={() => setIsSidebar(!isSidebar)}
          src={!toggleNight ? menuBlack : menuWhite}  
          />}
</header>


{isSidebar && <div className={`light-mobile-version ${toggleNight ? 'dark-mobile-version' : ''}`}>
    <div className='box'>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
  <h1> <div className='box'>
   
        <div className='div-1'></div>
        <div className='div-2'></div>
        <div className='div-3'></div>
    </div>
    kanban
  <img 
    src={!toggleNight ? xMark : xMarkWHite}
    onClick={() => setIsSidebar(!isSidebar)}
    />
    </h1>
    <div className='boards'>
      <h5>all boards (12)</h5>
      <ul>
        {allBoards.map(({id, icn, name}) => 
              <li 
              className={`platform`}
              key={id}>
              <p>{name}</p>
              <img src={!toggleNight ? icn : sideBlack}/>
            </li>
        )}
      </ul>
    </div>
    

<div className='toggle'>
  <img src={sun} />
    <button onClick={changeBackground} 
    className={`sun ${toggleNight ? 'moon' : false}`}><div></div></button>
  <img src={night} />
</div>

<div className='Todo-list-sidebar'>
  <span className={`card-light ${toggleNight ? 'card-dark' : false}`}>Shop-card</span>
  <ul>
    {selectedTasks.map((task) => (
        <li className={`light ${toggleNight ? 'dark' : false}`} key={task.id}>{task.title}


   <img
    src={!toggleNight ? xMarkWHite : xMark}
    onClick={(event) => {
    const taskId = Number(event.currentTarget.dataset.taskId);
    if (!isNaN(taskId)) {
      setSelectedTasks(prevTasks => prevTasks.filter(item => item.id !== taskId));
      toggleSectionPlus(taskId);
    }
  }}
    data-task-id={task.id} 
  />
</li>
      ))}
      
  </ul>

</div>

</div>}



<div className={`main-boxs-light ${toggleNight ? 'main-boxs-night' : ''}`}>
<div className='main-header'>
    <div>
      <div className='todo'></div><p>TODO (4)</p>
       <div className='doing'></div><p>DOING (6)</p>
      <div className='done'></div><p>DONE (7)</p>
    </div>
</div>

      <section>
        {sections.map(({ id, title, price, icn }) => (
            <div key={id}>
              <h3>{title}</h3>
              <p>{price}</p>
              <img
                onClick={() => {
                  if (selectedTasks.length < 4) {
                  addToDoList({id, title, price, icn});
                  toggleSectionPlus(id);
                  } else{
                    alert('You can only have 4 tasks in your to-do list.');
                  }  }}
                src={toggleNight ? icn : correctBlack}
                className='plus'
                style={{ display: togglePlus[id] ? 'none' : 'block' }}
              />
              {togglePlus[id] && (
                <img
                  onClick={() => {
                    setSelectedTasks(prevTasks => prevTasks.filter(task => task.id !== id));
                    toggleSectionPlus(id);
                  }}
                  src={toggleNight ? minusWhite : minusBlack}
                  className='plus'
                  style={{ display: togglePlus[id] ? 'block' : 'none' }}
                />
              )}
            </div>
        ))}
        </section>
</div>

    {isModal &&   <div className='overlay'></div>}
    {isSidebar && <div className='overlay'></div>}

  {isModal && <form 
      onSubmit={handleSubmit}
      className={`modal-light ${toggleNight ? 'modal-night' : false}`}
      >
      <img 
      src={toggleNight ? xMarkWHite : xMark} 
      onClick={() => setIsModal(!isModal)}
      />
      <h2>Add New Task</h2>

    <label htmlFor="text">Title</label>
    <input 
    className={`input-true ${error ? 'input-false' : false}`}
    value={validation}
    onChange={handleChange}
    type="text" 
    placeholder='e.g.Take coffee break'
    />
{error && <span style={{color: 'red'}}>{error}</span>}


      <label htmlFor="text">add tasks</label>
        <button type='submit' onClick={handleAddSubtask}>+ add new Subtasks</button>
  </form>}
  
  
    </>
  )
}
