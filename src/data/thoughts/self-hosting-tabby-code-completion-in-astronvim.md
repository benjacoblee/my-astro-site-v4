---
title: tabby code-completion in astronvim
date: 2024-10-27
description: Documenting the steps to install a self-hosted AI coding assistant
tags: [self-hosting, tabby, code-completion, astronvim, nvim, vim]
draft: false
slug: tabby-code-completion-astronvim
---

Today I decided that I really wanted code-completion. But, I don't want to pay for a Copilot subscription (I don't work as a developer anymore) - so we turned to self-hosting.

From the [Tabby Github repo](https://github.com/TabbyML/tabby):

> Tabby is a self-hosted AI coding assistant, offering an open-source and on-premises alternative to GitHub Copilot.

I like using docker-compose for everything. Corresponding page on [Docker Compose | Tabby](https://tabby.tabbyml.com/docs/quick-start/installation/docker-compose/) says we need to install [CUDA - Wikipedia](https://en.wikipedia.org/wiki/CUDA), which apparently is for "accelerated general-purpose processing", whatever that means.

Once that's done, [install](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-with-apt) **and** run configuration steps for Docker.

Then, we need a `docker-compose.yml`:

```yaml
version: '3.5'

services:
  tabby:
    restart: always
    image: registry.tabbyml.com/tabbyml/tabby
    command: serve --model StarCoder-1B --chat-model Qwen2-1.5B-Instruct --device cuda
    volumes:
      - "$HOME/.tabby:/data"
    ports:
      - 8080:8080
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

If the server started correctly, we should be able to visit the page at `localhost:8080`. After that, we need to create an account. Once that's done, we'll land on the homepage, where the `endpoint_url` and `token` are displayed. We'll need this later.

Next, we need to add this line in `nvim lua/community.lua`:

```lua
return {
	-- other plugins
	  { import = "astrocommunity.completion.tabby-nvim" },
}
```

This tells AstroNvim that we want to install the package provided by Astrocommunity.

Go into nvim again, and it should start installing everything.

Then, we need to configure our server and auth token. Instructions can be found on the [repo for vim-tabby](https://github.com/TabbyML/vim-tabby). 

```toml
[server]
endpoint = "http://localhost:8080"
token = "your-auth-token"
```

Assuming everything went well, we should see something like this!

![image](https://bnjmn-vault.s3.us-west-002.backblazeb2.com/6ef2a910e38b2bb61edc313f4e0e8425.png)

(For the most part, the installation was smooth, but it took me awhile to figure out how to accept code completion - here it is below)

[Docs](https://tabby.tabbyml.com/docs/extensions/installation/vim/#3-code-completion)

In the file where we call `require("lazy").setup()` we need to add the following:

```lua
require("lazy").setup({
  -- other stuff...
  {
    "TabbyML/vim-tabby",
    lazy = false,
    dependencies = {
      "neovim/nvim-lspconfig",
    },
    init = function()
      vim.g.tabby_inline_completion_keybinding_accept = "<A-i>" -- custom keybinding for completion
    end,
  },
})
```

**Links**

- [Tabby Github repo](https://github.com/TabbyML/tabby)
- [Docker Compose | Tabby](https://tabby.tabbyml.com/docs/quick-start/installation/docker-compose/)
- [CUDA - Wikipedia](https://en.wikipedia.org/wiki/CUDA)
- [nvidia CUDA install](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-with-apt)
- [Vim Tabby repo](https://github.com/TabbyML/vim-tabby)
- [vim-tabby docs](https://tabby.tabbyml.com/docs/extensions/installation/vim/#3-code-completion)
