package com.seckill.exception;

import com.seckill.dto.SeckillExecution;

/**
 * 重复秒杀异常
 */
public class RepeatKillException extends SeckillException{

    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause) {
        super(message, cause);
    }
}
