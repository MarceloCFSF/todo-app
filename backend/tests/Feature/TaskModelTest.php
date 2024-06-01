<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_task(): void
    {
        $user = User::factory()->create();
        Task::factory()->for($user)->create();
        
        $this->assertDatabaseCount('tasks', 1);
    }

    public function test_task_requires_name(): void
    {
        $user = User::factory()->create();

        $this->expectException(\Illuminate\Database\QueryException::class);

        Task::factory()->for($user)->create(['name' => null]);
    }

    public function test_can_update_task(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->for($user)->create();

        $task->update(['name' => 'Updated Title']);

        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'name' => 'Updated Title']);
    }

    public function test_can_delete_task(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->for($user)->create();

        $task->delete();

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_task_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $task = Task::factory()->for($user)->create();

        $this->assertInstanceOf(User::class, $task->user);
        $this->assertEquals($user->id, $task->user->id);
    }

    public function test_user_can_list_tasks(): void
    {
        $user = User::factory()->create();
        Task::factory()->for($user)->count(3)->create();

        $this->assertCount(3, $user->tasks);
    }

    public function test_tasks_are_deleted_when_user_is_deleted(): void
    {
        $user = User::factory()->create();
        Task::factory()->for($user)->count(3)->create();

        $user->delete();

        $this->assertDatabaseCount('tasks', 0);
    }
}
