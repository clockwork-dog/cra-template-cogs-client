I think it would be helpful to also explain in the README what this project does and how to use it. (e.g put it in the client-content folder, enable Timer plugin, etc etc.)

# My custom COGS Media Master content

This is a [`create-react-app`](https://create-react-app.dev) Typescript project that connects to [COGS](https://cogs.show) using [`@clockworkdog/cogs-client-react`](https://www.npmjs.com/package/@clockworkdog/cogs-client-react) & [`@clockworkdog/cogs-client`](https://www.npmjs.com/package/@clockworkdog/cogs-client). Don't hesitate to check the documentations if you want to know more!

## Local development in a browser

```
yarn start "My custom Media Master"
```

This will connect to COGS as a simulator for the Media Master called "My custom Media Master".

## Build for your COGS project

```
yarn build
```

The `build` directory can now be used by COGS as custom Media Master content.

You can place this entire project in your COGS project's `client_content` directory or, once built, you can copy the `build` directory to your COGS project's `client_content` directory. Select the built directory/subdirectory from COGS as your custom Media Master's "Content directory".

![Screenshot from 2021-10-01 09-31-04](https://user-images.githubusercontent.com/292958/135590011-c3d30df6-5590-4a44-8160-f31e3cd4008e.png)

## Test your custom Media Master content

Once connected to COGS, you can create your own little game to test your new Media Master's features!

### State

Use your custom Media Master's state `Score` and bind it to any behaviour of your choice to increment or decrement its value. For example, when you click a black button, your gain 2 points. But when you click a red button, you lose 1 point. 

### Events

Use your custom Media Master's event `Game Finished` and bind its option `Won` & `Lost` to any behaviour of your choice.  For example, you can trigger `Won` when your `Score` reach 10, and trigger `Lost` if your score fell down to 1. When `Won` or `Lost` are triggered, you get a fun animation on your custom Media Master's interface!

### Config or Media setup

In your custom Media Master's config, we added a default `Background Color`. Feel free to change it to any color of your choice.

### Plugins

If you click on **Settings** in the left panel in COGS, you'll find the Timer and Text Hints plugins. Customize your Timer to make your game more challenging, or use Text Hints to add some context to your game!

## Go further

Want to customize your config, add more events and state? Check your `cogs-plugin-manifest` in the `/public` folder, and your `App.tsx`. Make this custom Media Master your own! 
