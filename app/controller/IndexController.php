<?php
namespace app\controller;

use app\BaseController;
use think\facade\View;

/**
 * 前台首页
 */
class IndexController extends BaseController
{
    public function index()
    {
        $data = [
            'title' => '后台首页',
            'work_bench_url' => (string) url('index/home')
        ];
        View::assign($data);
        unset($data);
        return View::fetch('/index');
    }

    public function home()
    {
        return '启动成功';
    }
}