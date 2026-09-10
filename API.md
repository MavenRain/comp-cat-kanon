# API map

OCaml module wrappers become explicit dictionary arguments; record accessors become tuple projections. Names use camel case. This table maps source modules, not a claim of identical diagnostic text or mutable implementation details. See [PORTING.md](PORTING.md).

| Source module | Kanon implementation |
| --- | --- |
| `lib/book/ch2_sets` | [book](src/book.kan) |
| `lib/book/ch3_categories` | [finite](src/finite.kan), [runtime](src/runtime.kan), [instances](src/instances.kan), [book](src/book.kan) |
| `lib/book/ch4_limits` | [relations](src/relations.kan), [finset](src/finset.kan), [adapters](src/adapters.kan) |
| `lib/book/ch5_constructing` | [comma](src/comma.kan), [functor_colimit](src/functor_colimit.kan), [adapters](src/adapters.kan) |
| `lib/book/ch6_adjunctions` | [adjunction](src/adjunction.kan), [book](src/book.kan), [based_category](src/based_category.kan) |
| `lib/book/ch7_toposes` | [topos](src/topos.kan), [set_topos](src/set_topos.kan), [arrow_topos](src/arrow_topos.kan) |
| `lib/book/ch8_unify` | [unify](src/unify.kan), [unify_decompose](src/unify_decompose.kan) |
| `lib/book/ch9_theories` | [theories](src/theories.kan), [theory_language](src/theory_language.kan), [based_category](src/based_category.kan) |
| `lib/book/index` | [book](src/book.kan), [relations](src/relations.kan), [adapters](src/adapters.kan) |
| `lib/category` | [category](src/category.kan) |
| `lib/collapse/adjunction` | [adjunction](src/adjunction.kan) |
| `lib/collapse/coequalizer` | [collapse](src/collapse.kan) |
| `lib/collapse/colimit` | [collapse](src/collapse.kan) |
| `lib/collapse/coproduct` | [collapse](src/collapse.kan) |
| `lib/collapse/elements` | [elements](src/elements.kan) |
| `lib/collapse/end_coend` | [end_coend](src/end_coend.kan) |
| `lib/collapse/equalizer` | [collapse](src/collapse.kan) |
| `lib/collapse/exponential` | [topos](src/topos.kan), [adapters](src/adapters.kan) |
| `lib/collapse/factorization` | [collapse](src/collapse.kan) |
| `lib/collapse/free_algebra` | [omega](src/omega.kan) |
| `lib/collapse/initial` | [collapse](src/collapse.kan) |
| `lib/collapse/limit` | [collapse](src/collapse.kan) |
| `lib/collapse/omega` | [omega](src/omega.kan) |
| `lib/collapse/product` | [collapse](src/collapse.kan) |
| `lib/collapse/pullback` | [collapse](src/collapse.kan) |
| `lib/collapse/pushout` | [collapse](src/collapse.kan) |
| `lib/collapse/shapes` | [finite](src/finite.kan) |
| `lib/collapse/subobject` | [topos](src/topos.kan) |
| `lib/collapse/terminal_obj` | [collapse](src/collapse.kan) |
| `lib/collapse/topos` | [topos](src/topos.kan) |
| `lib/core/diagram` | [category](src/category.kan) |
| `lib/core/err` | [core](src/core.kan), [text](src/text.kan) |
| `lib/core/fnct` | [category](src/category.kan), [adapters](src/adapters.kan), [runtime](src/runtime.kan) |
| `lib/core/memo` | [adapters](src/adapters.kan) |
| `lib/core/res` | [core](src/core.kan), [adapters](src/adapters.kan) |
| `lib/core/shape` | [category](src/category.kan), [finite](src/finite.kan) |
| `lib/engine` | [engine](src/engine.kan) |
| `lib/ground` | [category](src/category.kan) |
| `lib/instances/arrow_cat` | [instances](src/instances.kan), [arrow_topos](src/arrow_topos.kan) |
| `lib/instances/fingraph` | [instances](src/instances.kan), [book](src/book.kan) |
| `lib/instances/finkleisli` | [finkleisli](src/finkleisli.kan) |
| `lib/instances/finset` | [finset](src/finset.kan), [book](src/book.kan) |
| `lib/instances/tag` | [tag](src/tag.kan), [set_topos](src/set_topos.kan) |
| `lib/instances/theories` | [theory_core](src/theory_core.kan), [theories](src/theories.kan), [based_category](src/based_category.kan) |
| `lib/iso` | [collapse](src/collapse.kan), [adapters](src/adapters.kan) |
| `lib/kan` | [kan](src/kan.kan) |
| `lib/laws` | [laws](src/laws.kan) |
| `lib/prod_cat` | [runtime](src/runtime.kan) |
| `lib/runtime/cat_data` | [category](src/category.kan), [runtime](src/runtime.kan) |
| `lib/runtime/comma` | [comma](src/comma.kan), [adapters](src/adapters.kan) |
| `lib/runtime/discrete` | [runtime](src/runtime.kan) |
| `lib/runtime/driver` | [kan](src/kan.kan), [collapse](src/collapse.kan), [runtime](src/runtime.kan) |
| `lib/runtime/fin` | [finite](src/finite.kan) |
| `lib/runtime/functor_cat` | [runtime](src/runtime.kan), [functor_colimit](src/functor_colimit.kan) |
| `lib/runtime/path` | [runtime](src/runtime.kan) |
| `lib/temporal/behaviour` | [temporal_core](src/temporal_core.kan) |
| `lib/temporal/later` | [trees](src/trees.kan) |
| `lib/temporal/omega_val` | [temporal_core](src/temporal_core.kan) |
| `lib/temporal/rule` | [rule](src/rule.kan), [temporal_destructors](src/temporal_destructors.kan) |
| `lib/temporal/temporal` | [temporal](src/temporal.kan), [temporal_core](src/temporal_core.kan), [temporal_constructors](src/temporal_constructors.kan) |
| `lib/temporal/temporal_eval` | [temporal_eval](src/temporal_eval.kan) |
| `lib/temporal/trees` | [trees](src/trees.kan) |
| `lib/temporal/trees_omega` | [trees](src/trees.kan) |
| `lib/temporal/verdict` | [temporal_core](src/temporal_core.kan) |

## Universal records

| Type | Fields |
| --- | --- |
| `Initial O H` | object, universal arrow |
| `Coproduct O H` | object, first leg, second leg, mediator |
| `Coequalizer O H` | object, quotient, mediator |
| `Colimiting O H` | apex, indexed legs, mediator |
| `Kan J K C L O H` | fibre colimit, leg, mediator, extension functor, unit/counit, desc/lift, factorization check, uniqueness check |
| `Adjunction A H B K` | name, left functor, right functor, unit, counit |
| `Exponential O H` | exponential object, evaluation, curry |
| `Classifier O H` | classifier object, truth arrow, characteristic square constructor |

## Definitions

Signatures are beside each definition in the linked source. The following index includes helpers so all exported global names can be located.

### [core](src/core.kan)

`Unit` `One` `Bool` `false` `true` `boolNot` `boolAnd` `boolOr` `boolNat` `List` `listNil` `listCons` `Option` `none` `some` `optionMap` `listFold` `listReverse` `listMap` `listLength` `Text` `Error` `errorCode` `Result` `ok` `err` `bind` `resultMap` `resultHolds` `require` `listAppend` `listConcat` `listFilter` `listAll` `listAny` `listMember` `listFind` `listUnique` `listEqual` `listFoldM` `listMapM` `listIndexed` `listLookup` `coreProbe`

### [literals](src/literals.kan)

`textCh` `textSlash` `textContext` `textComma` `textSemi` `textArrow` `textMapsTo` `textOpenSet` `textCloseSet` `textOpenGraph` `textCloseGraph` `textPink` `textBlue` `textPair` `textCloseParen` `textTrue` `textFalse` `textTuple` `textMinus` `textNotComposable` `textNeqSrc` `textNoArrow` `textSpaceArrow` `textNoSuch` `textColon` `textOutside` `textUniversal` `textIsNotMonic` `textEmptySet` `textNotSingleton` `textClash` `textVersus` `textCyclic` `textOccurs` `textIrreducible` `textNoWitness` `textBudget` `textSteps` `textUnbound` `textIn` `textIllFormed` `textUnsupported` `textFinSet` `textFinsetApp` `textFinsetCompose` `textNotParallel` `textCoequalizer` `textEqualizer` `textEngine` `textNode` `textEdge` `textLanLocate` `textCommaAbsent` `textIteratedCoproduct` `textFixedPoint` `textWColimit` `textVar` `textOpenParen` `textFinKleisli` `textSubArrow` `textUnifyDomain` `textFkUniversal` `textFkUniversalOmitted` `textLaterGuard` `textRule` `textRuleShape` `textRuleSpec` `textRuleObligation` `textArrowCategory` `textFinGraph` `textDecimalRange` `decimalPowers` `decimalNine`

### [text](src/text.kan)

`textAppend` `textConcat` `textJoin` `natPick` `decimalDigit` `decimalAcc` `natText` `natTextChecked` `resultContext` `errorText`

### [category](src/category.kan)

`Category` `opposite` `HomFinite` `FiniteCategory` `oppositeHom` `oppositeFinite` `Functor` `identityFunctor` `composeFunctor` `Natural` `unitCategory` `terminalCategory` `terminalFunctor` `Initial` `Coproduct` `Coequalizer` `Grounding` `IsoCategory` `Edge` `Shape` `Diagram` `Colimiting` `shapeEmpty` `shapeDiscreteTwo` `shapeParallel`

### [tag](src/tag.kan)

`Int` `intNat` `intNegative` `intEqual` `Tag` `TagGraph` `tagEqual` `tagGraphEqual` `tagSplit` `tagUnpair` `tagText` `tagGraphText`

### [finset](src/finset.kan)

`FinSet` `FinGraph` `FinArrow` `setMember` `setNormal` `setEqual` `setUnion` `setSingleton` `setCardinality` `setEmpty` `setIntersection` `setDifference` `setText` `setArrowText` `graphLookup` `setApply` `setMake` `setMakeM` `setArrowEqual` `setParallel` `setIdentity` `setCompose` `setGraphs` `setHom` `finSetCategory` `finSet` `setInitial` `setCoproduct` `setCoequalizer` `finSetGround` `setTerminal` `setProduct` `setEqualizer` `finSetDualGround` `setIsIso` `setInvert` `finSetIso`

### [finite](src/finite.kan)

`FinHom` `finId` `finNamed` `finSrc` `finTgt` `finEqual` `finiteCategory` `noComposites` `zeroCategory` `twoCategory` `parallelCategory` `shapeSpan` `shapeCospan` `spanCategory` `cospanCategory` `shapeTabulate`

### [engine](src/engine.kan)

`EngineAcc` `engineStart` `engineNode` `engineEdge` `engineColimit`

### [kan](src/kan.kan)

`CommaObject` `Fibre` `lanFibre` `Kan` `lan` `ran`

### [collapse](src/collapse.kan)

`colimit` `limit` `derivedInitial` `derivedCoproduct` `derivedProduct` `pairDiagram` `derivedCoequalizer` `derivedEqualizer` `spanDiagram` `derivedPushout` `derivedPullback` `derivedTerminal` `isoCheck` `canonicalIso` `reconcileCoproduct` `factorize`

### [omega](src/omega.kan)

`Fuel` `fuelZero` `fuelSucc` `fuelSize` `CountableCoproduct` `OmegaAcc` `omegaAbsorb` `iteratedCoproduct` `omegaFixedPoint` `composeChain` `OmegaCocone` `OmegaCoconeArrow` `OmegaColimit` `omegaColimit` `Algebra` `FreeAlgebra` `freeAlgebra` `omegaSpanPushout` `omegaFixpoint`

### [adjunction](src/adjunction.kan)

`UniversalArrow` `UniversalAdjunction` `Adjunction` `dualAdjunction` `leftAdjoint` `universalToAdjunction` `initialAdjunction` `lanAdjoint` `ranAdjoint` `adjointCocontinuous` `adjointContinuous`

### [finkleisli](src/finkleisli.kan)

`Operator` `operatorEqual` `Term` `TermArgs` `variable` `termArgsLookup` `application` `termEqual` `termArgsEqual` `termSubstitute` `termArgsSubstitute` `termOccurs` `termArgsOccurs` `termVariables` `termArgsVariables` `termText` `termArgsText` `Substitution` `substIdentity` `substApply` `substCompose` `substEqual` `substText` `finKleisliCategory` `fkInitial` `fkCoproduct`

### [unify](src/unify.kan)

`Constraint` `normalizeEquation` `normalizeArguments` `unitUnify` `UnifyState` `unifyStep` `unify` `recoverable` `onRecoverable` `fkCoequalizer` `finKleisliGround`

### [temporal_core](src/temporal_core.kan)

`Stage` `stageZero` `stageSucc` `stageNat` `stagePrefixes` `stagesThrough` `listTail` `listDropStage` `listHead` `listZipWith` `Verdict` `verdictOfBool` `verdictIsTrue` `verdictIsFalse` `verdictNeg` `verdictAnd` `verdictOr` `verdictImplies` `OmegaValue` `omegaBottom` `omegaTop` `omegaLeq` `omegaMeet` `omegaJoin` `omegaImplies` `omegaNeg` `omegaSucc` `omegaIsTrue` `omegaClassical` `Behavior` `stream` `lasso` `behaviorHead` `behaviorShift` `behaviorShiftBy` `behaviorNth` `Temporal`

### [temporal_constructors](src/temporal_constructors.kan)

`temporalTrue` `temporalFalse` `temporalState` `temporalAction` `temporalAnd` `temporalOr` `temporalNot` `temporalImplies` `temporalLater` `temporalNext` `temporalAlways` `temporalEventually`

### [temporal](src/temporal.kan)

`leadsTo` `stable` `weakFairness` `temporalForall` `temporalExists` `FormulaKey` `formulaKey` `formulaKeyEqual` `temporalEqual` `temporalNormalise`

### [temporal_eval](src/temporal_eval.kan)

`gradeSuccessors` `gradeCombine` `gradeLasso` `holdsStream` `temporalDepth` `temporalHolds`

### [trees](src/trees.kan)

`TreeObject` `TreeHom` `treeIdentity` `treeCompose` `treeCommutes` `treeTerminal` `treeOmega` `treeTruth` `TreeSubobject` `treeRestrict` `treeCharacter` `treeMeet` `treeJoin` `treeImplies` `treeNeg` `treeLater` `treeNext` `treeLaterFix`

### [temporal_destructors](src/temporal_destructors.kan)

`asAlways` `asEventually` `asImplies` `asAnd`

### [rule](src/rule.kan)

`Fact` `assume` `asLeadsTo` `asAlwaysImplies` `ruleCheck` `sameSpec` `leadsToSelf` `leadsToTrans` `orLeadsTo` `leadsToWeaken` `leadsToApply` `borrowInvariant` `isStateFormula` `isActionFormula` `initInvariant` `wf1`

### [comma](src/comma.kan)

`CommaObj` `CommaHom` `commaCategory` `CommaInput` `commaCommutes` `commaGround`

### [instances](src/instances.kan)

`ArrowObject` `ArrowMorphism` `arrowObject` `arrowInput` `arrowGround` `arrowCategory` `arrowCommutes` `arrowMorphism` `arrowTerminal` `arrowProduct` `arrowEqualizer` `arrowDualGround` `setCartesian` `setProductArrow` `squareFunctor` `graphInput` `graphGround` `graphCommutes` `graphObject`

### [topos](src/topos.kan)

`Exponential` `Exponentials` `PullbackSquare` `Classifier` `Topos` `binaryUniversal` `kanProduct` `productFunctor` `exponentialFunctor` `character` `trueOn` `falseOnOne` `logicNot` `logicAnd` `logicOr` `logicImply` `nameArrow` `logicForall` `squareCommutes` `powerObject` `logicExists` `omegaViaRan`

### [set_topos](src/set_topos.kan)

`tagGraphFromList` `tagGraphToList` `tagUntuple` `functionSpace` `setExponential` `setImage` `setPreimage` `boolOmega` `boolTruth` `boolChi` `boolChiM` `boolClassifier` `finSetTopos`

### [runtime](src/runtime.kan)

`finiteFromData` `discreteCategory` `Path` `pathEqual` `pathIdentity` `pathCategory` `pathExtend` `pathFinite` `productCategory` `listCross` `productFinite` `resultEqual` `functorEqual` `NatTransform` `naturalDot` `functorCategory`

### [elements](src/elements.kan)

`Presheaf` `ElementHom` `elementObjectEqual` `elementObject` `elementMorphism` `elementCategory` `elementFinite` `elementProjection`

### [end_coend](src/end_coend.kan)

`TwHom` `twistedCategory` `twistedHom` `twistedFinite` `twistedProjection` `endDiagram` `coend` `categoricalEnd`

### [theory_core](src/theory_core.kan)

`Closure` `mkClosureOf` `mkCloseUnion` `mkCloseTranslate` `mkInverseTranslate` `mkStarOf` `closureEqual`

### [theories](src/theories.kan)

`Institution` `Theory` `TheoryArrow` `Based` `basedOfTheory` `theoryEqual` `theoryCategory` `theoryMember` `checkTheoryArrow` `theoryGround` `basedCompose` `basedEnrich` `basedColimit` `fsInstitution` `fsTheoryGround` `theoryDerive`

### [theory_language](src/theory_language.kan)

`SetTheory` `SetTheoryArrow` `SetBased` `TheoryEnv` `ProcedureEnv` `theoryCombine` `theoryApply` `TheoryExpr` `TheoryArgs` `theorySemantics` `theoryArgsSemantics` `theorySignature`

### [arrow_topos](src/arrow_topos.kan)

`arrowTrueValue` `arrowFalseValue` `arrowStarValue` `arrowOmega` `arrowTruth` `setImageM` `setInverseImage` `arrowChi` `arrowClassifier` `arrowSentinelExponential` `arrowTopos`

### [functor_colimit](src/functor_colimit.kan)

`naturalRing` `applyDiagram` `colimitingFunctor`

### [book](src/book.kan)

`setIsEmpty` `setRemove` `singletonSplit` `setSplit` `setMap` `NumArrow` `numCategory` `graphEnds` `graphSource` `graphTarget` `graphMorphism` `discreteGraph` `asTotal` `discreteGraphFunctor` `componentsUniversal` `componentsAdjunction` `edgeComposition` `graphTransitiveClosure`

### [laws](src/laws.kan)

`Comparison` `compareIsomorphism` `comparisonVerdict` `compareInitial` `checkInitial` `compareCoproduct` `compareCoequalizer`

### [unify_decompose](src/unify_decompose.kan)

`ParallelSubstitution` `makeParallelSubstitution` `restrictParallel` `sumCoequalize` `compositeCoequalize` `sumDecompose` `topSame` `unifyWitness` `decompositionDispatch` `compositeDecompose` `irreducibleUnify`

### [adapters](src/adapters.kan)

`Memo` `shapeDiscrete` `memoGet` `resultBoth` `resultOfOption` `resultAll` `totalFunctor` `isoCanonical` `isoFromColimiting` `exponentialToAdjunction` `CartesianClosed` `cartesianClosed` `commaSwapObject` `commaSwapHom` `transportColimit`

### [relations](src/relations.kan)

`TernaryCoproduct` `ternaryCoproduct` `PushoutSquare` `composeSquares` `relationLeg` `relationSpan` `relationCompose`

### [based_category](src/based_category.kan)

`BasedArrow` `basedEqual` `basedCategory` `ParallelObject` `ParallelArrow` `parallelGraphCategory` `parallelIso`
