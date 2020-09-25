import React from 'react'
import './OwnSidebar.css';
import menu from '../../resources/menu.svg';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Login from "../../OwnHeader/Login";
import Register from "../../OwnHeader/Register";
import Products from "./Products";

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Sidebar>
)

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='a'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      <Link to='/products'>
        Productos
      </Link>
    </Menu.Item>
  </Sidebar>
)

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_ANIMATION':
      return { ...state, animation: action.animation, visible: !state.visible }
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}
function openMenu() {
  console.log('Abrir menu');
}
const OwnSidebar = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  return (
    <div>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        {vertical && (
          <HorizontalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />
        )}
        {!vertical && (
          <VerticalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic>

            <div className='inlineFlex'>
              <Button
                onClick={() =>
                  dispatch({ type: 'CHANGE_ANIMATION', animation: 'push' })
                }
              >
                <img src={menu} alt="Toggle menu" onClick={ openMenu } />
              </Button>
              <Form>
                <Form.Field inline>
                  <input placeholder="Producto a buscar..."/>
                  <Button>Search</Button>
                </Form.Field>
              </Form>
            </div>

              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/products">
                  <Products products={props.products}/>
                </Route>
                <Route path="/">
                  {/* <Oferts /> */}
                </Route>
              </Switch>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
};

export default OwnSidebar