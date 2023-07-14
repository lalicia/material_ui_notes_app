# Material UI Notes App

This project is completed following along to [The Net Ninja's Material UI Youtube tutorial series](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58).

Please note that if you're following the series my code won't align entirely with that as I'm making changes to update some of it as I go along.

Download the code & run **npm install** to install dependencies before starting the app.

## My Notes

### React Router

The first thing I noticed was that the project was done using version 5 of React Router, so I updated this to version 6. Version 6 had also changed from the last time I'd used it, so there was a learning curve with that.

NB. don't mistakenly get React Router instead of React Router Dom, because you will regret your life and you will see errors everywhere.

The router is now created in a function and handled a little bit differently:

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Notes />} />
      <Route path="/create" element={<Create />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
```

You don't need to do anything different in your `index.js`.

A core layout can be passed to the main route wrapping the others:

```js
<Route path="/" element={<Layout />}>
```

### Runtime errors - "./"

I'm not 100% what this was, but I changed the imports in `app.js` for the pages to:

```js
import Notes from "../src/pages/Notes";
import Create from "../src/pages/Create";
```

This seemed to resolve the issue.

### MUI 4 vs 5

I realised almost at the end of the project that I was using MUI v4 rather than MUI v5, which was from following the import instruction given on the tutorial. Now this is fine, but I had wanted specifically to be working with MUI 5 as I have a future need to work with that library (or even MUI 6).

So I went about updating the app to use MUI 5 following the instructions in the [docs](https://mui.com/material-ui/migration/migration-v4/#introduction), specifically `npm install @mui/material @mui/styles`, then replacing all imports from `@material-ui/*` to `@mui/*`, then the instructions found [here](https://mui.com/material-ui/migration/v5-style-changes/#%E2%9C%85-update-makestyles-import) for updating `makeStyles` (which needed to be imported from `@mui/styles`). I've made more notes below about `makeStyles` because it's very flaky in MUI 5, it seems.

There were some breaking changes in components (such as `TextField`) and I've tried to document these separately.

After doing all that and checking everything worked (and fixing what didn't) I then did `npm uninstall @material-ui/core` and prayed.

### MUI Icons

Once I installed and started to use icons I hit another set of runtime errors - to do with `@emotion` not being found. I ended up getting around these by following the instructions on this [stackoverflow](https://stackoverflow.com/questions/65486256/module-not-found-cant-resolve-emotion-react) and `npm i` `@emotion/react`, `@emotion/styled`, and `@emotion/utils`. I started strongly to lean toward restarting the tutorial with a fresh create-react-app...

### makeStyles

To add a hover effect (IE for a button):

```js
const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
    //to apply a hover effect
    "&:hover": {
      backgroundColor: "blue",
    },
  },
});
```

NB. you must have the ThemeProvider imported as with MUI 5 there's no longer a defaultTheme available in the way it was...
...to take in the theme object and inject it directly to access, you need to turn makeStyles into a function that returns instead:

```js
const useStyles = makeStyles((theme) => {
  return {
    btn: {
      fontSize: 60,
      backgroundColor: "violet",
      padding: theme.spacing(3),
      //to apply a hover effect
      "&:hover": {
        backgroundColor: "blue",
      },
    },
  };
});
```

You'd do this to use the inbuilt values - so a unit of padding is 8px and instead of having to workout how many px, you can just use 3.

If using mixins and you also want additional styles in your class, I think [this stackoverflow](https://stackoverflow.com/questions/70150747/material-ui-css-overriding-makestyles-css) shows you how to do it - I thought I needed to at one point but didn't end up using it.

NB. some `makeStyles` changes don't seem to take effect in MUI 5, it seems really hit and miss. One example is the `appbar` class that's made to create the correct width. I googled for a way to do this and came up with nothing, and also couldn't find a reason why some styles work that way and some don't. The solution I came up with was using the `sx` tag directly against the component, which did work to fix the problem. See example:

```js
<AppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }} elevation={0}>
  <Toolbar sx={{ bgcolor: "#fefefe", color: "text.primary" }}>
```

### createMuiTheme and ThemeProvider

`createMuiTheme` is depracated - you need to use `createTheme`.

`ThemeProvider` can't go around the routes in your router function - with some trial and error, it now fits in the return statement for `App.js` and wraps around the `RouterProvider`:

```js
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
```

### json-server

A nice way of persisting data without a backend or local storage, suitable for prototyping and mocking.

Any top level property it sees as a resource, so you can obtain things from it.

Of note, if you're against installing things globally like I am, then when you try and run json-server you'll get an error saying command not found. You just need to preface the command with npx - so the full command is `npx json-server --watch folder/filename.json --port 8000`.

NB. if you try to run the app without this being up and running it will fail to load and your app will be unreachable.

### useHistory

React Router v6 replaces `useHistory` with `useNavigate`. It's almost identical to implement, and [this page](https://reactrouter.com/en/main/upgrading/v5#use-usenavigate-instead-of-usehistory) in the docs shows you an example.

### Layout - children arr out Outlet is in

With React Router 6, a Layout for the site as a whole is done differently to how it's shown in the tutorial. For a layout that wraps all routes/pages, you include that as an `element` to the initial route path:

```js
const router = createBrowserRouter(
  createRoutesFromElements(
    //for styling around everything, like nav footer etc, make it the element
    <Route path="/" element={<Layout />}>
      <Route index element={<Notes />} />
      <Route path="/create" element={<Create />} />
    </Route>
  )
);
```

You don't use `children`, instead React Router 6 has an import called `Outlet` - and you use this like a component within your Layout to tell it where the page that's been routed to will render. This [link](https://www.youtube.com/watch?v=5s57C7leXc4&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=4) has a tutorial with a demonstration.

### classes={{}}

You can pass this as a prop to a MUI component to override the CSS styles being given to it by MUI.

### date-fns

This is used to format the date - I looked into it and it's a well used npm package, so nice to know about.

### Importing avatar images

This worked differently than I'm used to - I would normally import an image at the top and then use the dynamic reference. I also tried to do the path `../../etc` and that didn't work. In the tutorial it shows you how to do this and honestly I'm not sure why this works but it does. Worth flagging just in case I/someone runs into this issue and this prompts a solution.

### MUI 5 - Margins in TextField

With MUI 5 you can't update margins in the same way within `makeStyles` - you need to doubledown when making the class and do it like so:

```js
const useStyles = makeStyles({
  field: {
    display: "block",
    "&&": {
      marginTop: "1.25rem",
      marginBottom: "1.25rem",
    },
  },
});
```

I don't know why this is and didn't see it in the documentation when I was trying to find a solution, but I thankfully found [this stackoverflow post](https://stackoverflow.com/questions/69557763/margin-not-working-in-textfield-using-mui-makestyles) addressing the problem.

### MUI 5 - Radio colors

The colors for the `Radio` components now need to be stated explicitly per component use - you can't put it in the `RadioGroup` (I tried). Documentation covers it [here](https://mui.com/material-ui/migration/v5-component-changes/).

### MUI 5 - Avatar colors

This had to be done completely differently from the tutorial, as passing the colors through makeStyles just didn't work. I found [this stackoverflow](https://stackoverflow.com/questions/69570729/avatar-background-color-not-changing-dynamically-in-material-ui-v5) (where it looks like someone's building the same/similar thing lol) which explained a way of doing it. There's also a comment on the actual [YouTube video](https://www.youtube.com/watch?v=gEbSx5CCgSc&list=PL4cUxeGkcC9gjxLvV4VEkZ6H6H4yWuS58&index=17) where someone's done it with `sx` and a ternary in the JSX.

Interestingly the colors have to be put in with values - if you leave the value out then it doesn't work. So it needs to be `work: red[500]` not `work: red`.

Again, I didn't see an explanation in the official documentation around this when looking through breaking changes around components and styling.

### MUI 5 - Form control displaying as row

When I still had MUI 4 installed the `FormControl` section with the radio buttons for category displayed exactly like in the tutorial - however, when I switched to MUI 5 it displayed squished up and with the button on the side.

I got around this by passing an `sx` prop like so:

```js
<FormControl
  className={classes.field}
  sx={{ display: "flex", direction: "column" }}
>
```

### MUI 5 - ListItem vs ListItemButton, and the active class

The `classes.active` from `makeStyles` stopped working to highlight the chosen `ListItem` in the side drawer, and when I started looking into this I saw that `button` was deprecated as a prop - which led me to `ListItemButton`.

Switching that in was seamless, but still didn't make the `active` class color work, so I did some investigation and found a method that might work on [stackoverflow](https://stackoverflow.com/questions/71984986/how-can-i-override-styling-for-listitembutton-when-its-selected), but I managed to make it work in a ternary using `sx` instead:

```js
<ListItemButton
  key={item.text}
  onClick={() => navigate(item.path)}
  sx={{
    backgroundColor:
      location.pathname == item.path ? "#f4f4f4" : null,
  }}
>
```

### MUI 5 - Masonry

When it came to the final part of the tutorial series, I decided to look if MUI 5 came with a masonry grid feature, and low and behold, it does!

You need to `npm install @mui/lab` and then you can import `Masonry` as a component.

Using this rendered `Grid` and `GridItem` usless in the implementation, so I stripped these out and replaced the code to achieve a masonry grid effect, and it was actually pretty simple. The biggest change was going from how many columns of 12 you want the `GridItem` to take up at which screen size, to specifying how many columns you want the `Masonry` to have at which screen size.

The original code (without implementing the 3rd party masonry solution, as I didn't do that):

```js
return (
  <Container>
    {/*Grid is default 12 columns*/}
    <Grid container spacing={3} justifyContent="center">
      {notes.map((note) => {
        return (
          //Tells at what size screen and up the number of cols
          <Grid item key={note.id} xs={12} sm={9} md={6}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        );
      })}
    </Grid>
  </Container>
);
```

The updated solution:

```js
return (
  <Container>
    <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
      {notes.map((note) => {
        return (
          <NoteCard key={note.title} note={note} handleDelete={handleDelete} />
        );
      })}
    </Masonry>
  </Container>
);
```

What it looked like:
![image](/public/masonry.JPG)
