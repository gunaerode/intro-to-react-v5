const Pet = ({name, animal, breed}) => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, name),
            React.createElement("h2", {}, animal),
            React.createElement("h2", {}, breed)
        ]
    );
};

// your code is here
const App = () => {
    return React.createElement(
        "div",
        {id: "app-component-id"},
        [
            React.createElement("h1", {}, "Adopt me!"),
            React.createElement(Pet, { name: "Luna", animal: "dog", breed: "Havanese" }),
            React.createElement(Pet, { name: "Pepper", animal: "bird", breed: "" }),
            React.createElement(Pet, { name: "Doink", animal: "cat", breed: "stray" })
        ]
    );
};

ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
);