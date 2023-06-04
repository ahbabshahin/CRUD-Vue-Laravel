<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSkillRequest;
use App\Http\Resources\V1\SkillCollection;
use App\Http\Resources\V1\SkillResource;
use App\Models\Skill as ModelsSkill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        // return SkillResource::collection(ModelsSkill::all());
        // return SkillResource::collection(ModelsSkill::paginate(1));
        return new SkillCollection(ModelsSkill::all());
    }

    public function store(StoreSkillRequest $request)
    {
        ModelsSkill::create($request->validated());
        return response()->json('Skill created');
    }

    public function update(StoreSkillRequest $request, ModelsSkill $skill)
    {
        $skill->update($request->validated());
        return response()->json('Skill Updated');
    }

    public function show(ModelsSkill $skill)
    {
        return new SkillResource($skill);
    }

    public function destroy(ModelsSkill $skill)
    {
        $skill->delete();

        return response()->json('Skill deleted');
    }
}
