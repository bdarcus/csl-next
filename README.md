## The Idea

An experiment to create a new, simpler, but extensible CSL.

The idea is to simplify and generalize the template model, and move more of the logic to extensible parameter groups.

From the beginning, it is designed to add new features even while simplifying the model; notably:

1. multilingual
2. different citations modes

## Details

The code here is a `typescript` project that:

1. defines a model that is programatically-converted to `JSON Schema` files.
2. provides a proof-of-concept processor implementation.

The first is maybe 70% or so complete, while the second is barely-started.

Here is`VSCode`, with schema-backed validation of a YAML style, auto-complete.

![Screenshot from 2023-04-16 10-22-25](https://user-images.githubusercontent.com/1134/232319672-88e96d95-1806-4d6b-9d27-6d0cc32d5033.png)

To see the state of the model, see the `examples` directory, or do `make docs`. 

The Makefile targets include:

<dl>
  <dt>schemas</dt>
  <dd>Generate the JSON schemas.</dd>
  <dt>docs</dt>
  <dd>Generate the documentation, which outputs to the docs directory, and can be browsed locally.</dd>
  <dt>json</dt>
  <dd>Converts the YAML example(s) to JSON.</dd>
</dl>

See also `package.json`, for other options.

## FAQ

### Why?

At a high level CSL 1.0 is an XML DSL that sets some context-dependent parameters and provides templates for inline and block formatting of lists (citations and bibliographies respectively). 

But it has two limitations.

First, the template model is pretty complex, and so difficult for users and developers alike.

Second, it has no method for extension, so any change in behavior requires changes in the XML model, and often, by extension, the styles, and the input schema. 
Given the diversity of software implementations and thousands of styles, and the fact that much of the labor to maintain all this comes from time-strapped individuals, the lack of extensibility enforces a large degree of inertia that we need to address.

This is one idea on how we might do that, then.

### Why the name?

It's a placeholder to call it something, without suggesting any particular future.

### What could that future be?

Hard to say, because that will depend on what kind of interest there is.

Possibilities:

1. It may be the basis for CSL 2.0.
2. It may inform a path to iterate CSL 1.0.
3. Nothing at all.

### Why `typescript`?

1. It's an elegant way to define a model, that can be converted to different output targets, including `JSON schema` (for other language targets, see [quicktype](https://github.com/quicktype/quicktype)).
2. I _hate_ hand authoring `JSON schema`, even in `YAML`.
3. It's widely supported in the `JS` world, and `JS` widely supported more generally.
4. Because the [djot](https://djot.net/) reference implementation uses it, I'd like to take advantage of that.
5. There are two good `EDTF` libraries for date validation and formatting.
6. It might be possible to incorporate some code from [citeproc-js](https://github.com/Juris-M/citeproc-js)?

### Why `JSON Schema`? What happened to `XML`?

1. `JSON` (and `YAML`) is more broadly supported today.
2. No decisions on whether or not `XML`, actually, but this is a test to see how much simpler the model can be, and ensure it maps well to standard programming languages (the first implementation of CSL was in XSLT!).
3. It should be feasible to do both (though not clear the effort is worth it).

### Why isn't more functional code here now?

I am:

1. a `typescript` newbie, and an amateur programmer without much experience with it or `Javascript`.
2. pretty good at modeling these sorts of data, with strong domain knowledge, so that's what I started with.
3. didn't want to waste time going down a private rabbit hole without a broader interest check, and opportunity for collaboration.

### Further questions, ideas, offers of support or help?

See the issue tracker for details, particularly the priority task list in [#7](https://github.com/bdarcus/csl-next.js/issues/7).

