package com.seckill.dao;

import com.seckill.entity.Seckill;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface SeckillDao {

    /**
     * reduce product number in the data table
     * @param seckillId
     * @param killTime
     * @return if effect rows > 1, represent rows was update
     * org.apache.ibatis.binding.BindingException: Parameter 'seckillId' not found. Available parameters are [arg1, arg0, param1, param2]
     */
    int reduceNumber(@Param("seckillId") long seckillId, @Param("killTime") Date killTime);

    /**
     * query seckill product by id
     * @param seckillId
     * @return
     */
    Seckill queryById(long seckillId);

    /**
     * query product list by offset and limit
     * @param offset
     * @param limit
     * @return
     */
    List<Seckill> queryAll(@Param("offset") int offset, @Param("limit") int limit);
}
