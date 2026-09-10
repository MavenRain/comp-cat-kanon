open Comp_cat

let emit name args value =
  Printf.printf "{\"export\":%S,\"args\":[%s],\"expected\":%d}\n"
    name (String.concat "," (List.map string_of_int args)) value
let emit_result name args r =
  Result.fold ~ok:(emit name args)
    ~error:(fun e -> prerr_endline (Err.to_string e); exit 1) r
let set n = List.init n (fun k -> Tag.Just k)
let omega n = if n = 5 then Omega_val.Inf else Omega_val.Fin n
let depth = function Omega_val.Inf -> 100 | Omega_val.Fin n -> n
let verdict = function Verdict.False -> 0 | Verdict.Unknown -> 1 | Verdict.True -> 2
let p = Temporal.lift_state ~name:"p" Fun.id
let q = Temporal.lift_state ~name:"q" not
let formulas = Temporal.[p; always p; eventually p; always (eventually p);
  eventually (always p); leads_to q p; tl_next p; stable p; later p; neg (always p)]
let behaviours = Behaviour.[
  Lasso {stem=[||];loop=[|true|]}; Lasso {stem=[||];loop=[|false|]};
  Lasso {stem=[||];loop=[|true;false|]}; Lasso {stem=[|false|];loop=[|true|]};
  Stream (fun _ -> true); Stream (fun _ -> false); Stream (fun n -> n mod 2 = 0)]

let () =
  for n = 0 to 3 do
    for m = 0 to 3 do
      let a = set n and b = set m in
      let cardinality ((s, _, _), _) = List.length s in
      emit "diffHom" [n;m] (List.length (Finset.Finset.hom a b));
      emit_result "diffCoproduct" [n;m] (Result.map cardinality (Finset.Fs_ground.coproduct a b));
      emit_result "diffProduct" [n;m] (Result.map cardinality (Finset.Fs_op_ground.coproduct a b));
      emit_result "diffFunctionSpace" [n;m] (Result.map List.length (Ch7_toposes.function_space a b))
    done
  done;
  for n = 0 to 5 do
    emit "diffOmegaNeg" [n] (depth (Omega_val.neg (omega n)));
    emit "diffOmegaSucc" [n] (depth (Omega_val.succ (omega n)));
    for m = 0 to 5 do
      emit "diffOmegaMeet" [n;m] (depth (Omega_val.meet (omega n) (omega m)));
      emit "diffOmegaJoin" [n;m] (depth (Omega_val.join (omega n) (omega m)));
      emit "diffOmegaImp" [n;m] (depth (Omega_val.imp (omega n) (omega m)))
    done
  done;
  List.iteri (fun fi f -> List.iteri (fun bi b ->
    emit "diffTemporalHolds" [fi;bi] (verdict (Temporal_eval.holds ~fuel:4 f b));
    emit "diffTemporalDepth" [fi;bi] (depth (Temporal_eval.depth ~fuel:4 f b))) behaviours) formulas
