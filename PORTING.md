# Port notes

The source revision and library source hashes are in `port/source-manifest.json`.
Implementations are reorganized into native Kanon modules. OCaml module wrappers
and record accessors become dictionary arguments and tuple projections.
`API.md` maps source modules to their counterparts.

## Representations

* Lists, options, results, terms, formulas, and symbolic closures are native
  inductive families. Object and arrow type parameters erase at runtime.
* `One` is the runtime singleton. The pinned compiler erases the empty product,
  which cannot safely serve as a polymorphic runtime value. Boolean payloads
  retain the compiler's empty-product encoding.
* Comma preservation witnesses carry `(One, function)`. Directly returning a
  multi-argument function through a polymorphic result can trap in this compiler.
  Tests exercise the record representation.
* Finite set equality is extensional. Function spaces retain named argument
  graphs. Operator arities are sets of named places, not positional lengths.
* Shape identifiers are `Nat`. Relabel negative OCaml identifiers before use.
  Signed element labels use `Int`, encoded as nonnegative values or `-(n+1)`.
* Recursive bounds and stages are structural `Fuel` lists of `One`, fitting
  Kanon's termination checker. Scalar `Nat` is not structurally recursive.
* Streams become `Stage -> A`. A lasso stores its loop head separately, making
  empty loops unrepresentable through the constructor API.
* Formula equality uses structural keys with leaf names, preserving the source
  hash-consing equality rule without global mutable interning.

## Behavioral boundaries

The port preserves explicit source placeholders: the universal part of the
finite Kleisli coequalizer, abstract power objects, existential quantification,
the classifier-via-Ran placeholder, arrow-category exponentials, semantic theory membership, theory-arrow
checking, procedure application, and graph transitive closure. These return
structured errors. No theorem prover or model functor is supplied.

The finite-set and arrow-category classifier universals preserve a source
limitation: they build an inverse over the mono's whole codomain. For a proper
nonsurjective inclusion, this can fail even when the characteristic square
commutes. A regression test records that behavior. Source exponential evaluation
and curry conventions are retained; the generic CCC interface alone does not
establish its triangle identities.

The unifier structurally normalizes equations, then eliminates variables over
the original variable set. OCaml recursively decomposes categorical parallel
pairs. Those decomposition helpers are also ported. Successful unifiers are
compared by their equations and remaining variables rather than fresh names.
For simultaneously invalid equations, the first error can differ because the
normalization and elimination orders differ.

Lan and Ran recompute fibres by default. `memoGet` provides an explicit cache
that stores only successes, uses supplied equality, and evaluates misses lazily.
Callers thread the returned cache; there is no hidden mutable cache.

Omega chain composition enforces its supplied fuel bound. The OCaml source
documents that bound but does not enforce it in `compose_chain`. The port reports
`Budget` when the bound is exhausted.

Errors preserve variant kinds and nested context representation. Some diagnostic
strings and automatic chapter wrappers are condensed. Exact diagnostic text is
not an interface compatibility promise. Decimal rendering covers
`0 <= n < 10^19`, including the source's entire integer range. `natTextChecked`
returns `Unsupported` outside that range; `natText` emits a range marker.

## Compiler prerequisite

`toolchain/constructors.patch` threads expected types through surface constructor
elaboration. Parameterized, unindexed constructors are permitted only when their
expected family is known. Indexed parameterized constructors retain the original
restriction. The kernel still validates argument types. Bootstrap never edits
the original compiler checkout.

The implementation uses the pinned WebAssembly GC backend. Type checking does
not establish categorical laws for arbitrary manually assembled dictionaries.
