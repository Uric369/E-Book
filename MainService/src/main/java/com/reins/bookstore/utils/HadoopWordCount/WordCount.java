package com.reins.bookstore.utils.HadoopWordCount;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable>{

        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        public void map(Object key, Text value, Context context
        ) throws IOException, InterruptedException {
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken());
                context.write(word, one);
            }
        }
    }

    public static class IntSumReducer
            extends Reducer<Text,IntWritable,Text,IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values,
                           Context context
        ) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

    public static int wordCount() throws Exception {
        Configuration conf = new Configuration();
        conf.set("dfs.defaultFS", "hdfs://hadoop:9000");
        Job job = Job.getInstance(conf, "word count");
        job.setJarByClass(WordCount.class);
        job.setMapperClass(TokenizerMapper.class);
        job.setCombinerClass(IntSumReducer.class);
        job.setReducerClass(IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        FileInputFormat.addInputPath(job, new Path("F:\\coding\\web_plus\\jiaoji_app_back\\src\\main\\java\\com\\reins\\bookstore\\utils\\HadoopWordCount\\input"));
        Path outputPath = new Path("F:\\coding\\web_plus\\jiaoji_app_back\\src\\main\\java\\com\\reins\\bookstore\\utils\\HadoopWordCount\\output");

        // 检查输出路径是否存在
        FileSystem fs = FileSystem.get(conf);
        if (fs.exists(outputPath)) {
            // 如果存在，则删除输出目录
            fs.delete(outputPath, true);
        }

        FileOutputFormat.setOutputPath(job, outputPath);
        return job.waitForCompletion(true) ? 0 : 1;

    }
}