## What

An experiment to create a new, simpler, but extensible CSL.

I'm using `typescript` for the modeling, and automatic JSON Schema generation, but it doesn't do anything else ATM, largely because I know nothing about `typescript` or `js`!

But I at least like the idea of aligning code and schema, and don't find manually creating and maintaining `JSON Schema` to be fun, even in `YAML`.

Here is`VSCode`, with schema-backed validation and auto-complete.

![Screenshot from 2023-04-16 10-22-25](https://user-images.githubusercontent.com/1134/232319672-88e96d95-1806-4d6b-9d27-6d0cc32d5033.png)

## How

Currently, the only files that's worth looking at are `src/style.ts` and `src/reference.ts`. 
They reflect the basic ideas in the earlier `RELAX NG` draft schemas.

To generate the JSON schemas, run `npm install` and then `make`.

## Ideas/intentions/next steps/help needed

We need working code. 
If the basic idea here is sound, it should be much easier to do than a CSL 1.0 implementation. 
And initial coding should quickly confirm that be true or not.

Keep in mind, I designed CSL almost 20 years ago, as a novice programmer learning XML and XSLT on the fly. 
We also now have a tremendous amount of knowledge and experience wrapped up in the different code libraries, and thousands of styles. 

But I'm a typescript/js newbie, and don't really have the time to do a full implementation given my generally inefficient coding, particularly in a new language. 
So I need help. 

See the issue tracker for details, particularly the priority task list in [#7](https://github.com/bdarcus/csl-next.js/issues/7).
